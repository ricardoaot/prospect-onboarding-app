"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

import { request, gql } from "graphql-request";

import { Prospect } from '../../type/prospect'
import ProspectGrid from "./ProspectGrid";
import { Tabs, Tab, Box, Paper, Typography } from "@mui/material";

type prospectProp = {
    prospectList: Prospect[]
}

enum QualificationStatus {
    Pending = "pending",
    Approved = "approved",
    Rejected = "rejected",
    Blacklisted = "blacklisted",
}

export default function ProspectComponent({ prospectList }: prospectProp) {
    const [prospects, setProspects] = useState<Prospect[]>([]);
    const statuses = ["pending", "approved", "rejected"];

    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const currentStatus = searchParams.get("status") || "pending";
    const [selectedStatus, setSelectedStatus] = useState(currentStatus);

    const handleQualify = (id: string, QualificationStatus: string) => {
        console.log('id', id)
    }

    useEffect(() => {
        setSelectedStatus(currentStatus);
    }, [currentStatus]);


    useEffect(() => {
        setProspects(prospectList);
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

    const handleStatusChange = (_: React.SyntheticEvent, newValue: string) => {
        router.push(`${pathname}?status=${newValue}`, { scroll: false });
    };

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold mb-4">Lista de Prospectos</h1>

            <Box sx={{ width: "100%", p: 3 }}>
                <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
                    <Tabs
                        value={selectedStatus}
                        onChange={handleStatusChange}
                        indicatorColor="primary"
                        textColor="primary"
                        variant="fullWidth"
                    >
                        {statuses.map((status) => (
                            <Tab key={status} label={status.toUpperCase()} value={status} />
                        ))}
                    </Tabs>
                </Paper>

                <Box sx={{ mt: 2 }}>
                    {selectedStatus === "pending" && <PendingGrid />}
                    {selectedStatus === "approved" && <ApprovedGrid />}
                    {selectedStatus === "rejected" && <RejectedGrid />}
                </Box>
            </Box>
            <ProspectGrid prospectList={prospects} />

        </div>
    );
}

const PendingGrid = () => (
    <Paper sx={{ p: 3, textAlign: "center" }}>
        <Typography variant="h6">📌 Pending Items</Typography>
    </Paper>
);
const ApprovedGrid = () => (
    <Paper sx={{ p: 3, textAlign: "center" }}>
        <Typography variant="h6">✅ Approved Items</Typography>
    </Paper>
);
const RejectedGrid = () => (
    <Paper sx={{ p: 3, textAlign: "center" }}>
        <Typography variant="h6">❌ Rejected Items</Typography>
    </Paper>
);
