'use client'
import { useEffect, useRef, useState } from 'react'
import axios from 'axios';
import { filterFieldsData } from '@/lib/constant';

export interface paginationProps {
    pages: number;
    count: number;
    next: string;
    prev: string;
}

export interface characterListProps {
    id: number;
    name: string;
    image: string;
}

const useHome = () => {
    const [characterLists, setCharacterLists] = useState<characterListProps[]>([]); // State to store character lists
    const [searchCharacter, setSearchCharacter] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);
    const [page, setPage] = useState<number>(1);
    const [pagination, setPagination] = useState<paginationProps | undefined>();
    const debounceRef = useRef<NodeJS.Timeout | null>(null);
    const [filters, setFilters] = useState({
        status: '',
        gender: '',
        species: '',
        type: '',
        location: '',
        episode: '',
    });

    // Function to fetch all character lists
    const getCharacterList = async (name: string) => {
        setLoading(true);

        // Below code contains logic to add filter fields to the query in url
        const queryParams: string[] = [];
        const paginationParams = `page=${page}`;
        queryParams.push(paginationParams);

        if (name) {
            queryParams.push(`name=${encodeURIComponent(name)}`);
        }

        for (const key in filters) {
            const value = filters[key as keyof typeof filters];
            if (value) {
                queryParams.push(`${key}=${encodeURIComponent(value)}`);
            }
        }

        const queryString = queryParams.length > 0 ? `?${queryParams.join('&')}` : '';

        // Calling api for filter character based on given query
        try {
            const response = await axios.get(`https://rickandmortyapi.com/api/character${queryString}`, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            const data = await response.data;
            setPagination(data.info)
            const characterListsObj = data?.results.map((el: characterListProps) => ({
                id: el?.id,
                image: el?.image,
                name: el?.name,
            }))
            setCharacterLists(characterListsObj);
        } catch (error) {
            console.warn(error);
            setCharacterLists([]);
        } finally {
            setLoading(false);
        }
    }

    // Function to handle character search
    const handleCharacterSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const value = e.target.value;

        if (debounceRef.current) {
            clearTimeout(debounceRef.current);
        }

        debounceRef.current = setTimeout(() => {
            setSearchCharacter(value); // Your actual search logic
        }, 500); // 500ms debounce delay
    }

    // Function to update filter
    const updateFilter = (name: string, value: string) => {
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    // Function to handle pagination
    const handlePageClick = (selectedItem: number) => {
        setPage(selectedItem);
    };

    // Effect to run if filter or search functionality is used
    useEffect(() => {
        getCharacterList(searchCharacter);
    }, [searchCharacter, filters, page]);

    return {
        characterLists,
        loading,
        handleCharacterSearch,
        updateFilter,
        filterFieldsData,
        handlePageClick,
        page,
        pagination
    }
}

export default useHome