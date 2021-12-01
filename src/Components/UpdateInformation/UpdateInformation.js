function UpdateInformation({
                               errors,
                               min,
                               max,
                               pattern,
                               register,
                               minLength,
                               maxLength,
                               children,
                               htmlFor,
                               className,
                               type,
                               placeholder,
                               id,
                               registerName,
                               value,
                               onChange,
                               patternMessage,
                               minLengthMessage,
                               maxLengthMessage,
                               minMessage,
                               maxMessage,
                               required,
                           }) {
    return (
        <label
            className={className}
            htmlFor={htmlFor}>
            {children}
            <input
                type={type}
                placeholder={placeholder}
                {...register(registerName, {
                        required: required,
                        pattern: {
                            value: pattern,
                            message: patternMessage
                        },
                        minLength: {
                            value: minLength,
                            message: minLengthMessage
                        },
                        maxLength: {
                            value: maxLength,
                            message: maxLengthMessage
                        },
                        min: {
                            value: min,
                            message: minMessage
                        },
                        max: {
                            value: max,
                            message: maxMessage
                        },
                    },
                )}
                value={value}
                onChange={onChange}
            />
            {errors[id] && <p>{errors[id].message}</p>}
        </label>
    )
}

export default UpdateInformation