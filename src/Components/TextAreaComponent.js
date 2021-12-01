function TextAreaComponent({
                               name,
                               id,
                               cols,
                               rows,
                               placeholder,
                               register,
                               registerName,
                               minLength,
                               minLengthMessage,
                               maxLength,
                               maxLengthMessage,
                               errors,
                               required,
                           }) {
    return (
        <>
        <textarea
            name={name}
            cols={cols}
            rows={rows}
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
                }
            )}
        />
            {errors[id] && <p>{errors[id].message}</p>}
        </>
    )
}

export default TextAreaComponent