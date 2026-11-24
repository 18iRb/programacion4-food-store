interface FormErrorProps {
    errors: readonly (string | undefined)[];
}

function FormError({
    errors,
}: FormErrorProps) {
    return (
        <div className="min-h-5">
            {errors.map((error) =>
                error ? (
                    <p
                        key={error}
                        className="text-sm text-red-600"
                    >
                        {error}
                    </p>
                ) : null
            )}
        </div>
    );
}

export default FormError;