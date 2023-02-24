import DashboardCard from '../../../components/shared/DashboardCard';
import { useEffect } from "react";
import React, { useState } from 'react';

function Map() {
    const { kakao } = window;
    const [selectedMarker, setSelectedMarker] = useState(null);

    useEffect(() => {
        let container = document.getElementById("map");
        let options = {
            center: new window.kakao.maps.LatLng(
                35.23553857913,
                129.0757845396242
            ),
            level: 3,
        };

        let map = new window.kakao.maps.Map(container, options);

        var positions = [
            {
                title: "최정인",
                latlng: new kakao.maps.LatLng(35.23521953927345, 129.0754425062451),
            },
            {
                title: "김민수",
                latlng: new kakao.maps.LatLng(35.23529631715695, 129.0764823971279),
            },
            {
                title: "손재우",
                latlng: new kakao.maps.LatLng(35.235836515697436, 129.076773503503),
            },
            {
                title: "윤진식",
                latlng: new kakao.maps.LatLng(35.23586245380163, 129.0761810555057),
            }
        ];


        var markers = [];

        for (var i = 0; i < positions.length; i++) {
            var imageSrc;
            if (i == 3) {
                imageSrc = process.env.PUBLIC_URL + "/img/a1.jpg";
            } else if (i == 1) {
                imageSrc = process.env.PUBLIC_URL + `/img/a5.jpg`;
            } else if (i == 1) {
                imageSrc = process.env.PUBLIC_URL + `/img/a2jpg`;
            } else {
                imageSrc = process.env.PUBLIC_URL + `/img/a4.jpg`;
            }

            // 마커 이미지의 이미지 크기 입니다
            var imageSize = new kakao.maps.Size(50, 50);

            // 마커 이미지를 생성합니다    
            var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

            // 마커를 생성합니다
            var marker = new kakao.maps.Marker({
                map: map, // 마커를 표시할 지도
                position: positions[i].latlng, // 마커를 표시할 위치
                title: positions[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
                image: markerImage, // 마커 이미지 
                clickable: true // 마커를 클릭했을 때 지도의 클릭 이벤트가 발생하지 않도록 설정합니다
            });

            marker.setMap(map);
            markers.push(marker); //생성된 마커 객체를 배열에 저장

            // 마커 클릭 이벤트 등록
            kakao.maps.event.addListener(markers[i], "click", function () {
                // 클릭한 마커의 인포윈도우를 연다
                setSelectedMarker(this);
            });
        }


        if (selectedMarker) {
            var infowindow = new kakao.maps.InfoWindow({
                content:
                    <div>
                        <h1>abc</h1>
                        <h2>selectedMarker.getTitle()</h2>
                    </div>,
                removable: true
            });
            infowindow.open(map, selectedMarker);
        }


    }, [selectedMarker]);

    return (
        <>
            <DashboardCard title="현장 근로자 위치">
                <div id="map" style={{ width: "100%", height: "400px" }} />
            </DashboardCard>

        </>
    )
}

export default Map;


