
const FormHeader = () => {

    return (
        <div className="flex mx-4 sm:mx-8 md:mx-12 lg:mx-16 my-4 sm:my-5 md:my-6 justify-between items-center">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#006B5C]">
                Stay
                <span className="text-[#FF6B35]">Afrika</span>
            </h1>

            <button 
                className="border border-[#D6D6D6] rounded-lg px-3 py-2 sm:px-3.5 sm:py-3 cursor-pointer text-[#666666] text-sm sm:text-base whitespace-nowrap"
            >
                Save & Close
            </button>
        </div>
    )
}

export default FormHeader;
