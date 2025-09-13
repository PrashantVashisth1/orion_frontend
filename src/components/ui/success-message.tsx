interface SuccessMessageProps {
  show: boolean
  message?: string
}

export function SuccessMessage({ show, message = "Success!! Your Post is now live." }: SuccessMessageProps) {
  if (!show) return null

  return (
    <div className="flex justify-center mt-6">
      <div className="bg-orange-200 text-gray-900 px-8 py-3 rounded-full shadow-md">{message}</div>
    </div>
  )
}
