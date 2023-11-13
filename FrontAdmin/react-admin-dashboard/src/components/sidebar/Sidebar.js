import React from "react";
import "./Sidebar.css";
import HomeroundedIcon from '@mui/icons-material/HomeRounded';
import PersonOutLinedIcon from '@mui/icons-material/PersonOutline';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import PaymentRoundedIcon from '@mui/icons-material/PaymentRounded';
import RateReviewRoundedIcon from '@mui/icons-material/RateReviewRounded';

export default function Sidebar() {
    return <div className="sidebar">
        <div className="sidebarWrapper">
            <div className="sidebarMenu">
                <h3 className="sidebarTitle">대시보드</h3>
                <ul className="sidebarList">
                    <li className="sidebarListItem active">
                        <HomeroundedIcon className="sidebarIcon" />
                        Home
                    </li>
                    <li className="sidebarListItem">
                        <PersonOutLinedIcon className="sidebarIcon" />
                        유저 관리
                    </li>
                    <li className="sidebarListItem">
                        <CalendarMonthRoundedIcon className="sidebarIcon" />
                        예약 관리
                    </li>
                    <li className="sidebarListItem">
                        <PaymentRoundedIcon className="sidebarIcon" />
                        결제 관리
                    </li>
                    <li className="sidebarListItem">
                        <RateReviewRoundedIcon className="sidebarIcon" />
                        리뷰 관리
                    </li>
                </ul>
            </div>
        </div>
    </div>
}