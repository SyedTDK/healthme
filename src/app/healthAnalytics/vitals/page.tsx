//This page will display all the vitals and option to add new vitals.

export default async function New() {
    return (
        <div>
            <h1 className="text-3xl font-semibold text-center">Vitals</h1>
            <div className="flex justify-center">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">Add New Vitals</button>
            </div>
        </div>
    );
}