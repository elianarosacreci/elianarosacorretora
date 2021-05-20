import { createContext, ReactNode, useContext, useState } from 'react';

type Episode = {
    title: string;
    members: string;
    thumbnail: string;
    duration: number;
    url: string
};

type ImmobilesContextData = {
    episodeList: Episode[];
    play: (episode: Episode) => void;
};

export const ImmobilesContext = createContext({} as ImmobilesContextData);

// ----------------------------------------------------------------------------------------------------

type ImmobilesContextProviderProps = {
    children: ReactNode
};

export function ImmobilesContextProvider({ children }: ImmobilesContextProviderProps) {
    const [episodeList, setEpisodeList] = useState([]);

    function play(episode: Episode) {
        setEpisodeList([episode]);
    };



    return (
        <ImmobilesContext.Provider value={{
            episodeList,
            play,
        }}>
            {children}
        </ImmobilesContext.Provider>
    )
}

export const useImmobile = () => {
    return useContext(ImmobilesContext);
}