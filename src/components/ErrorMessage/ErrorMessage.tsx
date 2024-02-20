export default function ErrorMessage({ error }: { error: string }) {
  return (
    <>
      <div className="w-full h-14 text-center">
        {error && (
          <p className="text-red-500 mt-2">
            Error en la conversión: {error}
          </p>
        )}
      </div>
    </>
  )
}