import DashboardCard from '../../../components/shared/DashboardCard';
import { useEffect } from 'react';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';


function Map() {
    let { gps } = useSelector((state) => {
        return state;
    });

    const lastgps = Object.values(
        gps.reduce((acc, { id, lat, lon, recordTime }) => {
            if (!acc[id] || acc[id].recordTime < recordTime) {
                acc[id] = { id, lat, lon, recordTime };
            }
            return acc;
        }, {}),
    );
    const { kakao } = window;

    useEffect(() => {
        let container = document.getElementById('map');
        let options = {
            center: new window.kakao.maps.LatLng(35.16926956176758, 129.14048767089844),
            level: 2,
        };

        let map = new window.kakao.maps.Map(container, options);

        const positions = lastgps.map((a, i) => {
            return {
                content: `<div>${a.id}님의 현재위치</div>`,
                latlng: new kakao.maps.LatLng(a.lat, a.lon),
            };
        });

        for (var i = 0; i < positions.length; i++) {
            var imageSrc;
            if (i == 3) {
                imageSrc = process.env.PUBLIC_URL + '/img/a1.jpg';
            } else if (i == 2) {
                imageSrc = process.env.PUBLIC_URL + `/img/a5.jpg`;
            } else if (i == 1) {
                imageSrc = process.env.PUBLIC_URL + `/img/a2.jpg`;
            } else {
                imageSrc = process.env.PUBLIC_URL + `/img/a3.jpg`;
            }

            var imageSize = new kakao.maps.Size(50, 50);

            // 마커 이미지를 생성합니다
            var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

            var marker = new kakao.maps.Marker({
                map: map, // 마커를 표시할 지도
                position: positions[i].latlng, // 마커의 위치
                image: markerImage,
                clickable: true,
            });

            // 마커에 표시할 인포윈도우를 생성합니다
            var infowindow = new kakao.maps.InfoWindow({
                content: positions[i].content, // 인포윈도우에 표시할 내용
            });

            // 마커에 mouseover 이벤트와 mouseout 이벤트를 등록합니다
            // 이벤트 리스너로는 클로저를 만들어 등록합니다
            // for문에서 클로저를 만들어 주지 않으면 마지막 마커에만 이벤트가 등록됩니다
            kakao.maps.event.addListener(marker, 'mouseover', makeOverListener(map, marker, infowindow));
            kakao.maps.event.addListener(marker, 'mouseout', makeOutListener(infowindow));
        }

        // 인포윈도우를 표시하는 클로저를 만드는 함수입니다
        function makeOverListener(map, marker, infowindow) {
            return function () {
                infowindow.open(map, marker);
            };
        }

        // 인포윈도우를 닫는 클로저를 만드는 함수입니다
        function makeOutListener(infowindow) {
            return function () {
                infowindow.close();
            };
        }

        // 마커에 클릭이벤트를 등록합니다
        kakao.maps.event.addListener(marker, 'click', function () {
            // 마커 위에 인포윈도우를 표시합니다
            infowindow.open(map, marker);
        });
    });

    return (
        <>
            <DashboardCard title="현장 근로자 위치">
                <div id="map" style={{ width: '100%', height: '400px' }} />
            </DashboardCard>
        </>
    );
}

export default Map;
