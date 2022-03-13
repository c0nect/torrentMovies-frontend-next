function Index() {
    return(
        <>
            <div className="text-center">
                <h1 className="mt-6 text-3xl font-extrabold text-gray-900">Hello from TorrentMovies</h1>
                <a href="/login" className="font-medium text-red-600 hover:text-indigo-500">
                    Login Page
                </a> 
                <br />
                <a href="/dashboard" className="font-medium text-red-600 hover:text-indigo-500">
                    Dashboard Page
                </a>
            </div>
        </>
    )
}

export default Index