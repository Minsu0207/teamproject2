import DashboardCard from '../../../components/shared/DashboardCard';
import { useEffect } from "react";
function Map() {
    const { kakao } = window;
    useEffect(() => {
        let container = document.getElementById("map");
        let options = {
            center: new window.kakao.maps.LatLng(
                35.23583857913,
                129.0767845396242
            ),
            level: 3,
        };

        let map = new window.kakao.maps.Map(container, options);

        var positions = [
            {
                title: '최정인',
                latlng: new kakao.maps.LatLng(35.23521953927345, 129.0754425062451)
            },
            {
                title: '김민수',
                latlng: new kakao.maps.LatLng(35.23529631715695, 129.0764823971279)
            },
            {
                title: '손재우',
                latlng: new kakao.maps.LatLng(35.235836515697436, 129.07677350350343)
            },
            {
                title: '윤진식',
                latlng: new kakao.maps.LatLng(35.23586245380163, 129.0761810555057)
            }
        ];

        // process.env.PUBLIC_URL + "/img/1-3.png"
        // 마커 이미지의 이미지 주소입니다
        var imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";

        for (var i = 0; i < positions.length; i++) {

            // 마커 이미지의 이미지 크기 입니다
            var imageSize = new kakao.maps.Size(24, 35);

            // 마커 이미지를 생성합니다    
            var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

            // 마커를 생성합니다
            var marker = new kakao.maps.Marker({
                map: map, // 마커를 표시할 지도
                position: positions[i].latlng, // 마커를 표시할 위치
                title: positions[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
                image: markerImage // 마커 이미지 
            });
        }
    }, []);


    return (
        <>
            <DashboardCard title="현장 근로자 위치">
                <div id="map" style={{ width: "100%", height: "600px" }} />
            </DashboardCard>
        </>
    )
}

export default Map;


