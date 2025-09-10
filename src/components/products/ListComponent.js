// import { useEffect, useState } from "react";
// import {getList} from "../../api/productsApi";
// import useCustomMove from "../../hooks/useCustomMove";
// import FetchingModal from "../common/FetchingModal";
// import {API_SERVER_HOST} from "../../api/todoApi"
// import PageComponent from "../common/PageComponent"


// const host = API_SERVER_HOST

// const initState = {
//   dtoList:[],
//   pageNumList:[],
//   pageRequestDTO: null,
//   prev: false,
//   next: false,
//   totoalCount: 0,
//   prevPage: 0,
//   nextPage: 0,
//   totalPage: 0,
//   current: 0
// }

// const ListComponent = () => {

//     const {page, size, refresh, moveToList, moveToRead} = useCustomMove()

//       //serverData는 나중에 사용
//       const [serverData, setServerData] = useState(initState)
    
//       //for FetchingModal 
//       const [fetching, setFetching] = useState(false)

//   useEffect(() => {

//     setFetching(true)

//     getList({page,size}).then(data => {
//       console.log(data)
//       setServerData(data)
//       setFetching(false)
//     })

//   }, [page,size, refresh])

//     return(
//     <div className="border-2 border-blue-100 mt-10 mr-2 ml-2">

//         {fetching? <FetchingModal/> :<></>}

//         <div className="flex flex-wrap mx-auto p-6">

//           {serverData.dtoList.map(product => 

//             <div key={product.pno} className="w-1/2 p-1 rounded shadow-md border-2" onClick={  () => moveToRead(product.pno)}>

//               <div className="flex flex-col h-full">
//                   <div className="font-extrabold text-2xl p-2 w-full">
//                     {product.pno}
//                   </div>

//                   <div className="text-1xl m-1 p-2 w-full flex flex-col"> 

//                     <div className="w-full overflow-hidden">
//                       <img alt="product" className="m-auto rounded-md w-60"
//                       src={`${host}/api/products/view/s_${product.uploadFileNames[0]}`}></img>
//                     </div>

                  
//                   </div>
//               </div>
//             </div>
//           )}
//         </div>
//         <PageComponent serverData={serverData} movePage={moveToList}></PageComponent>
//     </div>

//     // <div className="border-2 border-blue-100 mt-10 mr-2 ml-2">
//     //   {fetching ? <FetchingModal /> : <></>}

//     //   <div className="flex flex-wrap mx-auto p-6">
//     //     {/* 이 부분 수정 */}
//     //     {serverData.dtoList && serverData.dtoList.length > 0 ? (
//     //       serverData.dtoList.map((product) => (
//     //         <div
//     //           key={product.pno}
//     //           className="w-1/2 p-1 rounded shadow-md border-2"
//     //           onClick={() => moveToRead(product.pno)}
//     //         >
//     //           <div className="flex flex-col h-full">
//     //             <div className="font-extrabold text-2xl p-2 w-full">
//     //               {product.pno}
//     //             </div>

//     //             <div className="text-1xl m-1 p-2 w-full flex flex-col">
//     //               <div className="w-full overflow-hidden">
//     //                 <img
//     //                   alt="product"
//     //                   className="m-auto rounded-md w-60"
//     //                   src={`${host}/api/products/view/s_${product.uploadFileNames[0]}`}
//     //                 ></img>
//     //               </div>
//     //             </div>
//     //           </div>
//     //         </div>
//     //       ))
//     //     ) : (
//     //       <div>상품이 없습니다.</div>
//     //     )}
//     //   </div>
//     //   <PageComponent serverData={serverData} movePage={moveToList}></PageComponent>
//     // </div>
//     )
// }

//export default ListComponent;


//ListComponent.js
import { useEffect, useState } from "react";
import { getList } from "../../api/productsApi";
import useCustomMove from "../../hooks/useCustomMove";
import FetchingModal from "../common/FetchingModal";
import { API_SERVER_HOST } from "../../api/todoApi";
import PageComponent from "../common/PageComponent";

const host = API_SERVER_HOST;

const initState = {
  dtoList: [],
  pageNumList: [],
  pageRequestDTO: null,
  prev: false,
  next: false,
  totalCount: 0,
  prevPage: 0,
  nextPage: 0,
  totalPage: 0,
  current: 0,
};

const ListComponent = () => {
  const { page, size, refresh, moveToList, moveToRead } = useCustomMove();
  const [serverData, setServerData] = useState(initState);
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState(null); // 에러 상태 추가

  useEffect(() => {
    setFetching(true);

    getList({ page, size })
      .then((data) => {
        console.log("받은 API 데이터 구조 : " + data);
        // API 응답이 유효한지 확인
        if (data && Array.isArray(data.dtoList)) {
          setServerData(data);
          setError(null); // 성공 시 에러 초기화
        } else {
          // 응답이 유효하지 않으면 에러 상태 설정
          setError(new Error("Invalid API response: dtoList is missing."));
        }
      })
      .catch((err) => {
        // API 호출 자체에 실패했을 때 에러 상태 설정
        console.error("API call failed:", err);
        setError(err);
      })
      .finally(() => {
        setFetching(false);
      });
  }, [page, size, refresh]);

  // 로딩, 에러, 데이터 없는 경우를 명확하게 처리
  if (fetching) {
    return <FetchingModal />;
  }

  if (error) {
    // 사용자에게 친화적인 에러 메시지 표시
    return <div>오류가 발생했습니다. 잠시 후 다시 시도해 주세요.</div>;
  }

  // `serverData.dtoList`가 없을 경우를 대비하여 조건부 렌더링
  const productsToRender = serverData.dtoList || [];

  return (
//     <div className="border-2 border-blue-100 mt-10 mr-2 ml-2">
//       <div className="flex flex-wrap mx-auto p-6">
//         {productsToRender.length > 0 ? (
//           productsToRender.map((product) => (
//             <div
//               key={product.pno}
//               className="w-1/2 p-1 rounded shadow-md border-2"
//               onClick={() => moveToRead(product.pno)}
//             >
//               {/*...기존 코드...*/}
//               <div className="flex flex-col h-full">
//                 <div className="font-extrabold text-2xl p-2 w-full">
//                   {product.pno}
//                 </div>
//                 <div className="text-1xl m-1 p-2 w-full flex flex-col">
//                   <div className="w-full overflow-hidden">
//                     <img
//                       alt="product"
//                       className="m-auto rounded-md w-60"
//                       src={`${host}/api/products/view/s_${product.uploadFileNames[0]}`}
//                     ></img>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))
//         ) : (
//           <div className="text-center w-full">상품이 없습니다.</div>
//         )}
//       </div>
//       <PageComponent serverData={serverData} movePage={moveToList}></PageComponent>
//     </div>
//   );
// };

// export default ListComponent;
 <div className="border-2 border-blue-100 mt-10 mr-2 ml-2">
      <div className="flex flex-wrap mx-auto p-6">
        {/* dtoList가 항상 배열이므로 안전하게 map을 호출할 수 있습니다. */}
        {serverData.dtoList.map(product => (
          <div 
            key={product.pno} 
            className="w-1/2 p-1 rounded shadow-md border-2" 
            onClick={() => moveToRead(product.pno)}
          >
            <div className="flex flex-col h-full">
              <div className="font-extrabold text-2xl p-2 w-full">
                {product.pno}
              </div>
              <div className="text-1xl m-1 p-2 w-full flex flex-col"> 
                <div className="w-full overflow-hidden">
                  <img 
                    alt="product" 
                    className="m-auto rounded-md w-60"
                    src={`${host}/api/products/view/s_${product.uploadFileNames[0]}`}>
                  </img>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <PageComponent serverData={serverData} movePage={moveToList}></PageComponent>
    </div>
  );
};

export default ListComponent;