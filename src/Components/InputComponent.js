function InputComponent({
                            type,
                            placeholder,
                            registerName,
                            register,
                            required,
                            minLength,
                            minLengthMessage,
                            maxLength,
                            maxLengthMessage,
                            errors,
                            id,
                        }) {
    return (
        <>
            <input type={type}
                   placeholder={placeholder}
                   {...register(registerName, {
                           required: required,
                           minLength: {
                               value: minLength,
                               message: minLengthMessage
                           },
                           maxLength: {
                               value: maxLength,
                               message: maxLengthMessage
                           },
                       },
                   )}
            />
            {errors[id] && <p>{errors[id].message}</p>}
        </>
    )
}

export default InputComponent