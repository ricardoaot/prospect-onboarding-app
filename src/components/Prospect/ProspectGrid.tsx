"use client";

import { useState, useEffect } from "react";
import { request, gql } from "graphql-request";

import { Prospect } from '../../type/prospect'

type prospectProp = {
    prospectList: Prospect[]
}

enum QualificationStatus {
    Pending = "pending",
    Approved = "approved",
    Rejected = "rejected",
    Blacklisted = "blacklisted",
}

export default function ProspectGrid({ prospectList }: prospectProp) {
    const [prospects, setProspects] = useState<Prospect[]>([]);

    const handleQualify = (id: string, QualificationStatus: string) => {
        console.log('id', id)
    }

    useEffect(() => {
        setProspects(prospectList);
        console.log('prospectList', prospectList)
        
        //loadProspects();
    }, [prospectList]);

    /*
      const loadProspects = async () => {
        const data = await getProspects();
        setProspects(data.users);
      };
    
      const handleQualify = async (id: string) => {
        await qualifyProspect(id);
        loadProspects(); // Recargar la lista después de eliminar
      };
    */
    return (
        <div className="p-4">
            <h1 className="text-xl font-bold mb-4">Pending</h1>

            {/* Headers */}
            <div className="grid grid-cols-5 bg-gray-700 text-white p-2 rounded-md">
                <div className="font-semibold">Name</div>
                <div className="font-semibold">Email</div>
                <div className="font-semibold">Phone</div>
                <div className="font-semibold">Birthday</div>
                <div className="font-semibold text-center">Actions</div>
            </div>

            {/* Prospect List */}
            <div className="divide-y divide-gray-200">
                {prospects.map((prospect) => (
                    <div key={prospect.id} className="grid grid-cols-5 p-2 items-center">
                        <div className="text-gray-900 font-medium">{`${prospect.name} ${prospect.lastname}`}</div>
                        <div className="text-gray-600">{prospect.email}</div>
                        <div className="text-gray-600">{prospect.phone}</div>
                        <div className="text-gray-600">{prospect.birthday}</div>
                        <div className="flex justify-center gap-2">
                            <button
                                onClick={() => handleQualify(prospect.id, QualificationStatus.Approved)} 
                                className="bg-blue-500 text-white px-3 py-1 rounded-md"
                            >
                                Approve
                            </button>
                            <button
                                onClick={() => handleQualify(prospect.id, QualificationStatus.Rejected)}
                                className="bg-red-500 text-white px-3 py-1 rounded-md"
                            >
                                Reject
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
