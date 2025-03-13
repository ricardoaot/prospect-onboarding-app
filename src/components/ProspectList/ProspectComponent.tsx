"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

import { request } from "graphql-request";

import { Prospect } from '../../type/prospect'
import ProspectGrid from "./ProspectGrid";
import { Tabs, Tab, Box, Paper, Typography } from "@mui/material";
import { getProspects, QUALIFY_PROSPECT } from "./ProspectListQueries";

type prospectProp = {
    prospectList: Prospect[]
}
import { ProspectStatus } from "../../type/prospect";

export default function ProspectComponent({ prospectList }: prospectProp) {
    const [pendingProspects, setPendingProspects] = useState<Prospect[]>([]);
    const [approvedProspects, setApprovedProspects] = useState<Prospect[]>([]);
    const [rejectedProspects, setRejectedProspects] = useState<Prospect[]>([]);

    const statuses = [
        ProspectStatus.Pending,
        ProspectStatus.Approved,
        ProspectStatus.Rejected
    ];

    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const currentStatus = searchParams.get("status") || "pending";
    const [selectedStatus, setSelectedStatus] = useState(currentStatus);

    const fetchPendingProspectGrids = async () => {
        const pendingProspectsData = await getProspects([ProspectStatus.Pending]); setPendingProspects(pendingProspectsData)
    }

    const fetchApprovedProspectGrids = async () => {
        const approvedProspectsData = await getProspects([ProspectStatus.Approved]);
        setApprovedProspects(approvedProspectsData)
    }

    const fetchRejectedProspectGrids = async () => {
        const rejectedProspectsData = await getProspects(
            [
                ProspectStatus.Rejected
                , ProspectStatus.Blacklisted
            ]
        );
        setRejectedProspects(rejectedProspectsData)
    }

    const fetchProspectGrids = async () => {
        fetchPendingProspectGrids()
        fetchApprovedProspectGrids()
        fetchRejectedProspectGrids()
    }

    const handlerQualifyProspect = async (id: string, qualificationStatus: string) => {
        try {
            const data = {
                id,
                status: qualificationStatus
            }
            const onboardingUrl = process.env.NEXT_PUBLIC_API_URL;

            const response = await request(
                `${onboardingUrl}/graphql`,
                QUALIFY_PROSPECT,
                data
            );
            console.log("Qualified Prospect:", response);
            fetchProspectGrids()
        } catch (error) {
            console.error("Error updating prospect:", error);
        }
    }

    useEffect(() => {
        //Only in the first render set Pending prospects from the data fetched in the server with SSR
        setPendingProspects(prospectList)
        fetchApprovedProspectGrids()
        fetchRejectedProspectGrids()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        setSelectedStatus(currentStatus);
    }, [currentStatus]);

    const handleStatusChange = (_: React.SyntheticEvent, newValue: string) => {
        router.push(`${pathname}?status=${newValue}`, { scroll: false });
    };

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold mb-4">Prospect List</h1>

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
                    {selectedStatus === ProspectStatus.Pending &&
                        <>
                            <Paper sx={{ p: 3, textAlign: "left" }}>
                                <Typography variant="h6">Pending Items</Typography>
                                <ProspectGrid
                                    prospectList={pendingProspects}
                                    statusActions={[
                                        ProspectStatus.Approved,
                                        ProspectStatus.Rejected,
                                        ProspectStatus.Blacklisted
                                    ]}
                                    handlerQualifyProspect={handlerQualifyProspect}
                                />
                            </Paper>

                        </>
                    }
                    {selectedStatus === ProspectStatus.Approved &&
                        <>
                            <Paper sx={{ p: 3, textAlign: "left" }}>
                                <Typography variant="h6">Approved Items</Typography>
                                <ProspectGrid
                                    prospectList={approvedProspects}
                                    statusActions={[
                                        ProspectStatus.Pending
                                    ]}
                                    handlerQualifyProspect={handlerQualifyProspect} />
                            </Paper>
                        </>
                    }
                    {selectedStatus === ProspectStatus.Rejected &&
                        <>
                            <Paper sx={{ p: 3, textAlign: "left" }}>
                                <Typography variant="h6">Rejected Items</Typography>
                                <ProspectGrid
                                    prospectList={rejectedProspects}
                                    statusActions={[
                                        ProspectStatus.Pending
                                    ]}
                                    handlerQualifyProspect={handlerQualifyProspect} />
                            </Paper>
                        </>
                    }
                </Box>
            </Box>
        </div>
    );
}
