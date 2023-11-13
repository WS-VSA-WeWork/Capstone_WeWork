import React from 'react';
import './FeaturedInfo.css';

export default function FeaturedInfo() {
    return (
        <div className='featured'>
            <div className='featuredItem'>
                <span className='featuredTitle'>결제 승인 현황</span>
                <div className='featuredMoneyContainer'>
                    <span className='featuredMoney'>235,400원 - 한달 기준</span><br />
                    <span className='featuredMoneyRate'>12건 - 예약 승인 건수</span>
                </div>
                <div className='featuredSub'>전월 대비 10% 증가</div>    
            </div>
            <div className='featuredItem'>
                <span className='featuredTitle'>예약 취소 현황</span>
                <div className='featuredMoneyContainer'>
                    <span className='featuredMoney'>30,000원 - 한달 기준</span><br />
                    <span className='featuredMoneyRate'>2건 - 예약 취소 건수</span>
                </div>
                <div className='featuredSub'>전월 대비 10% 증가</div>    
            </div>
        </div>
    );
}