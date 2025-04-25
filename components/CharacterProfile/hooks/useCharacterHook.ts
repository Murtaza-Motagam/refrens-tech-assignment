import axios from 'axios';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react'

export interface characterProps {
    name: string;
    species: string;
    gender: string;
    type: string;
    status: string;
    location: string;
    origin: string;
    episode: string;
    image: string;
}

export interface episodeProps {
    name: string;
    air_date: string;
    episode: string;
    id: number;
    url: string;
}

export interface locationProps {
    id: number;
    name: string;
    type: string;
    dimension: string;
    residents: string[];
    created: string;
}

const useCharacterHook = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [character, setCharacter] = useState<characterProps>();
    const [charLocation, setCharLocation] = useState<locationProps>();
    const [episodes, setEpisodes] = useState<episodeProps[]>([]);

    const { id } = useParams();

    const getCharacter = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`https://rickandmortyapi.com/api/character/${Number(id)}`);
            const data = response.data;
            const characterData = {
                name: data.name,
                species: data.species,
                gender: data.gender,
                type: data.type,
                status: data.status,
                location: data.location?.name,
                origin: data.origin?.name,
                episode: data.episode,
                image: data.image,
            }
            const totalEpisodeInAppeared = data.episode;
            const episodes = totalEpisodeInAppeared.map((ep: string) => ep.split('/').pop());
            const location = data.location?.url?.split('/').pop();
            getLocation(location);
            getCharacterEpisode(episodes);
            setCharacter(characterData);
        } catch (error) {
            console.error('Error fetching character:', error);
        } finally {
            setLoading(false);
        }
    }

    const getLocation = async (loc: string) => {
        try {
            const response = await axios.get(`https://rickandmortyapi.com/api/location/${loc}`);
            const data = response.data;
            const locData = {
                name: data.name,
                type: data.type,
                dimension: data.dimension,
                residents: data.residents?.length || 0,
                created: data.created,
                id: data.id,
                url: data.url,
            }
            setCharLocation(locData);
        } catch (error) {
            console.error('Error fetching location:', error);
        }
    }

    const getCharacterEpisode = async (episode: [string]) => {
        try {
            const response = await axios.get(`https://rickandmortyapi.com/api/episode/${episode.join(',')}`);
            const data = response.data;
            if (data.length > 0) {
                const episodeData = data.map((episode: episodeProps) => ({
                    name: episode.name,
                    air_date: episode.air_date,
                    episode: episode.episode,
                    id: episode.id,
                    url: episode.url,
                }));
                setEpisodes(episodeData);
            } else {
                const episodeData = {
                    name: data.name,
                    air_date: data.air_date,
                    episode: data.episode,
                    id: data.id,
                    url: data.url,
                }
                setEpisodes([episodeData]);
            }
        } catch (error) {
            console.error('Error fetching character:', error);
        }
    }

    useEffect(() => {
        getCharacter();
    }, [id])

    return {
        character,
        loading,
        episodes,
        charLocation,
    }
}

export default useCharacterHook