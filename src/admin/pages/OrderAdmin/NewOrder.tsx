import React from 'react'

type Props = {}



const NewOrder = (props: Props) => {
    return (
        <>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                    <thead className="ltr:text-left rtl:text-right">
                        <tr>
                            <th className="px-4 py-2">
                                <label htmlFor="SelectAll" className="sr-only">Select All</label>

                                <input type="checkbox" id="SelectAll" className="size-5 rounded border-gray-300" />
                            </th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Name</th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Date of Birth</th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Role</th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Salary</th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Thao Tác</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200">
                        <tr>
                            <td className="px-4 py-2">
                                <label className="sr-only" htmlFor="Row1">Row 1</label>

                                <input className="size-5 rounded border-gray-300" type="checkbox" id="Row1" />
                            </td>
                            <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">John Doe</td>
                            <td className="whitespace-nowrap px-4 py-2 text-gray-700">24/05/1995</td>
                            <td className="whitespace-nowrap px-4 py-2 text-gray-700">Web Developer</td>
                            <td className="whitespace-nowrap px-4 py-2 text-gray-700">$120,000</td>
                        </tr>

                        <tr>
                            <td className="px-4 py-2">
                                <label className="sr-only" htmlFor="Row2">Row 2</label>

                                <input className="size-5 rounded border-gray-300" type="checkbox" id="Row2" />
                            </td>
                            <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Jane Doe</td>
                            <td className="whitespace-nowrap px-4 py-2 text-gray-700">04/11/1980</td>
                            <td className="whitespace-nowrap px-4 py-2 text-gray-700">Web Designer</td>
                            <td className="whitespace-nowrap px-4 py-2 text-gray-700">$100,000</td>
                            <td>
                                <button
                                    className="border border-black inline-flex items-center justify-center gap-2 rounded-md w-20 h-9 text-sm text-gray-500 hover:text-white hover:bg-black transition duration-300 ease-in-out focus:ring-2 focus:ring-blue-500">
                                    Xác Nhận
                                </button>
                            </td>
                        </tr>

                        <tr>
                            <td className="px-4 py-2">
                                <label className="sr-only" htmlFor="Row3">Row 3</label>

                                <input className="size-5 rounded border-gray-300" type="checkbox" id="Row3" />
                            </td>
                            <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Gary Barlow</td>
                            <td className="whitespace-nowrap px-4 py-2 text-gray-700">24/05/1995</td>
                            <td className="whitespace-nowrap px-4 py-2 text-gray-700">Singer</td>
                            <td className="whitespace-nowrap px-4 py-2 text-gray-700">$20,000</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default NewOrder