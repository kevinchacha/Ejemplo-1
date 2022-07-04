import { useState } from "react"

export const useForm = (initialState = {}, validateForm) => {
    const [values, setValues] = useState(initialState);
    const [error, setError] = useState({});
    const handleInputChange = ({target}) => {
        setValues({
            ...values,
            [ target.name ]: target.value
        })
    }
    const handleInputBlur = (e) => {
        handleInputChange(e);
        setError(validateForm(values))
    }

    return [values, handleInputChange, setValues, handleInputBlur ,error, setError];
}