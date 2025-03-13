"use client";

import { useState, useEffect } from "react";
import { Prospect, ProspectStatus } from '../../type/prospect'

type prospectProp = {
    prospectList: Prospect[],
    statusActions: string[],
    handlerQualifyProspect: (id: string, qualificationStatus: string) => void
}

export default function ProspectGrid(
    {
        prospectList,
        statusActions,
        handlerQualifyProspect
    }: prospectProp
) {
    const [prospects, setProspects] = useState<Prospect[]>([]);

    useEffect(() => {
        setProspects(prospectList);
    }, [prospectList]);

    return (
        <div className="p-4">
            {/* Headers */}
            <div className="grid grid-cols-5 bg-gray-700 text-white p-2 rounded-md">
                <div className="font-semibold">Name</div>
                <div className="font-semibold">Email</div>
                <div className="font-semibold">Phone</div>
                <div className="font-semibold">Status</div>
                <div className="font-semibold text-center">Actions</div>
            </div>

            {/* Prospect List */}
            <div className="divide-y divide-gray-200">
                {prospects.map((prospect) => (
                    <div key={prospect.id} className="grid grid-cols-5 p-2 items-center">
                        <div className="text-gray-900 font-medium">{`${prospect.name} ${prospect.lastname}`}</div>
                        <div className="text-gray-600">{prospect.email}</div>
                        <div className="text-gray-600">{prospect.phone}</div>
                        <div className="text-gray-600">{prospect.status}</div>
                        <div className="flex justify-center gap-2">
                            {statusActions.includes(ProspectStatus.Approved) &&
                                <button
                                    onClick={() => handlerQualifyProspect(prospect.id, ProspectStatus.Approved)}
                                    className="bg-green-300 text-gray-700 px-3 py-1 rounded-md"
                                >
                                    Approve
                                </button>
                            }
                            {statusActions.includes(ProspectStatus.Rejected) &&
                                <button
                                    onClick={() => handlerQualifyProspect(prospect.id, ProspectStatus.Rejected)}
                                    className="bg-red-400 text-black-700 px-3 py-1 rounded-md"
                                >
                                    Reject
                                </button>
                            }
                            {statusActions.includes(ProspectStatus.Blacklisted) &&
                                <button
                                    onClick={() => handlerQualifyProspect(prospect.id, ProspectStatus.Blacklisted)}
                                    className="bg-black text-white px-3 py-1 rounded-md"
                                >
                                    Blacklist
                                </button>
                            }
                            {statusActions.includes(ProspectStatus.Pending) &&
                                <button
                                    onClick={() => handlerQualifyProspect(prospect.id, ProspectStatus.Pending)}
                                    className="bg-blue-500 text-white px-3 py-1 rounded-md"
                                >
                                    Pending
                                </button>
                            }
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
