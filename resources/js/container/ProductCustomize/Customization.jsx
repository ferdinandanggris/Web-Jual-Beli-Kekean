import { createContext, useContext, useState } from "react";

const CustomizationContext = createContext({})

export const CustomizationProvider = (props) => {
    const [materialDKa, setMaterialDKa] = useState('kawung')
    const [materialKe, setMaterialKe] = useState('kawung')
    const [materialDKi, setMaterialDKi] = useState('kawung')
    const [materialKa, setMaterialKa] = useState('kawung')
    return (
        <CustomizationContext.Provider value={{
            materialDKa,
            setMaterialDKa,
            materialKe,
            setMaterialKe,
            materialDKi,
            setMaterialDKi,
            materialKa,
            setMaterialKa,
        }}>
            {props.children}
        </CustomizationContext.Provider>
    )
}

export const useCustomization = () => {
    const context = useContext(CustomizationContext)
    return context
}