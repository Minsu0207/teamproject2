import DashboardCard from '../../../components/DashboardCard';
import { useEffect } from 'react';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';




function Map() {
    let { worker } = useSelector((state) => {
        return state;
    });


    //데이터중 recordTime이 가장 최신값이 1개만 추출, 중복제거
    const lastgps = Object.values(worker.reduce((a, cur) => {
        const { id, name, position, age, employedDate, contact, lat, lon, temperature, o2, result, heartRate, steps, recordTime } = cur;
        if (!a[id] || a[id].recordTime < recordTime) {
            a[id] = { id, name, age, position, employedDate, contact, lat, lon, temperature, o2, result, heartRate, steps, recordTime };
        }
        return a;
    }, {}));

    console.log(worker)
    const { kakao } = window;

    useEffect(() => {
        let container = document.getElementById('map');
        let options = {
            center: new window.kakao.maps.LatLng(35.1687, 129.1402),
            level: 2,
        };

        let map = new window.kakao.maps.Map(container, options);


        const positions = worker.map((a, i) => {
            return {
                content: `
                <div>
                <a>${a.name}님의 현재위치</a><br />
                <a>체온 ${a.temperature} 맥박수${a.heartRate}</a><br />
                <a>클릭시 상세정보</a>
                </div>
                <div style="text-align: center;">
                </div>
                
                `
                ,
                latlng: new kakao.maps.LatLng(a.lat, a.lon),
                id: a.id,
                o2: a.o2,
                temperature: a.temperature,
                heartRate: a.heartRate,
                status: a.status
            };

        });


        for (var i = 0; i < worker.length; i++) {
            let imageSrc;
            if (
                worker[i].status === '정상' &&
                worker[i].temperature >= 35.0 && worker[i].temperature <= 37.3 &&
                worker[i].o2 >= 95
            ) {
                imageSrc = `${process.env.PUBLIC_URL}/img/hel1.png`;
                //정상 마커
            } else if (
                worker[i].status === '넘어짐' ||
                worker[i].temperature <= 35.0 || worker[i].temperature >= 37.3 ||
                worker[i].o2 >= 90
            ) {
                imageSrc = `${process.env.PUBLIC_URL}/img/hel2.png`;
                //주의 마커
            } else {
                imageSrc = `${process.env.PUBLIC_URL}/img/hel3.png`;
                //위험 마커
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
            // 마커에 클릭이벤트를 등록합니다
            kakao.maps.event.addListener(marker, 'click', move(infowindow, marker, positions[i]));
        }
    }, []);


    //마커 클릭시 해당 작업자 상세보기
    function move(positions, marker, clickedPosition) {
        return function () {
            if (clickedPosition) {
                const { id } = clickedPosition;
                const link = `/healthinfo/${id}`;
                window.location.href = link;
            }
        }
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



    return (
        <>
            <DashboardCard title="현장 근로자 위치">
                <div id="map" style={{ width: '100%', height: '600px' }} />
            </DashboardCard>
        </>
    );
}

export default Map;
