
export const Appbar = () => {
    return <div className="shadow h-14 flex justify-between">
        <div className="flex flex-col justify-center h-full ml-4">
            <span className="flex justify-center text-4xl text-black">Paystation</span>
        </div>
        <div className="flex">
            <div className="flex flex-col justify-center h-full mr-4">
            <span className="flex justify-center text-2xl text-black">Hello</span>
            </div>
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl">
                    U
                </div>
            </div>
        </div>
    </div>
}