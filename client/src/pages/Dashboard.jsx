// HOOKS
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// LIBS
import Axios from "axios";

// MODAL
import InputModal from "../components/Modal/InputModal";

// ICONS
import addIcon from "../Assests/add.svg";
import addFolderIcon from "../Assests/add-folder.svg";
import trashIcon from "../Assests/trash.svg";

// COMPONENTS
import Folder from "../components/Folder/Folder.js";
import Card from "../components/Card/Card";
import Details from "../components/Details/Details";

// SERVICE
import helper from "../Services/helper";
import LangModal from "../components/Modal/LangModal";

const BASE_URL = helper.BASE_URL;

export default function Dashboard() {
  const [reloadDash, setReloadDash] = useState(0);
  const navigate = useNavigate();
  const [isClickedFolderYet, setClickedFolderYet] = useState(false);

  const [isAddNewFolderClicked, setAddNewFolder] = useState(false);
  const [newFolder, setNewFolder] = useState({});

  const [folders, setFolders] = useState([
    {
      name: "",
      folder_id: "",
    },
  ]);

  const [activeFolderId, setActiveFolderId] = useState({
    folderId: "",
    folderName: "",
    date: "",
  });

  const [folderSnippets, setFolderSnippets] = useState([
    {
      title: "",
      content: "",
      language: "",
      folderName: "",
      date: "",
      userId: "",
      _id: "",
    },
  ]);

  const token = window.localStorage.getItem("token");
  const [isOverviewClicked, setOverviewClick] = useState(true);
  const [isExtensionClicked, setExtensionClick] = useState();

  const [entityNameChanged, setEntityName] = useState("");
  const [entityDescChanged, setEntityDesc] = useState("");

  console.log("entityNameChanged", entityNameChanged);
  console.log("entityDescChanged", entityDescChanged);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      const url = BASE_URL + "/verify";
      Axios.get(url, {
        headers: {
          Authorization: token,
        },
      }).then((response) => {
        console.log("reponse from /verify router in auth login", response);
        // fetch user details here
        let isAuthorisedUser = response.data.isVerified;
        if (isAuthorisedUser) {
          console.log("authorized user");

          const url = BASE_URL + "/dashboard";
          Axios.get(url, {
            headers: {
              Authorization: token,
            },
          })
            .then((response) => {
              const userFolders = response.data.folders;
              // console.log("client dashboard response", userFolders);

              const folderSpecs = userFolders.map((folder) => {
                return {
                  name: folder.name,
                  folder_id: folder._id,
                  date: folder.date.substring(0, 10),
                };
              });

              // console.log("folderSpecs", folderSpecs);

              setFolders(folderSpecs);
              // console.log("folders", folders);
            })
            .catch((err) => {
              // console.log("Dashboard client err", err);
            });
        } else {
          navigate("/login");
        }
      });
    }
  }, [reloadDash]);

  function getSnippetsOfAFolder(folderId, folderName, date) {
    console.log("get snipepts of a folder");
    setActiveFolderId({ folderId, folderName, date });
    // console.log("folder ", folderId, folderName, date);
    // console.log("open this folder with id", folderId);
    const url = BASE_URL + "/dashboard/" + folderId;

    Axios.get(url, {
      headers: {
        Authorization: token,
      },
    })
      .then((response) => {
        const folderSnippetsArray = response.data.snippets;
        // console.log("folderSnippetsArray", folderSnippetsArray);

        setFolderSnippets(folderSnippetsArray);
        // console.log("folderSnippets", folderSnippets);

        setClickedFolderYet(true);
      })
      .catch((err) => {
        // console.log("client open folder err", err);
      });
  }

  function openSnippet(snippet_id) {
    // console.log("clicked on snippet with id", snippet_id);
    navigate("/editor", {
      state: {
        folderId: activeFolderId.folderId,
        snippetId: snippet_id,
        mode: "view",
      },
    });
  }

  function createNewFolder(newFolderObject) {

    console.log("inside new folder object");
    console.log("newFolderObject", newFolderObject);
    setReloadDash((prev) => prev + 1);

    // setNewFolder(newFolderObject);

    Axios.post(
      BASE_URL + "/dashboard/",
      {
        folderName: newFolderObject.title,
      },
      {
        headers: { Authorization: token },
      }
    )
      .then((response) => {
        // console.log("response after creating new folder", response);
        setAddNewFolder(false);
      })
      .catch((err) => {
        // console.log("create new folder client err", err);
      });
  }

  function openEditor() {
    navigate("/editor", {
      state: {
        folderId: activeFolderId.folderId,
        folderName: activeFolderId.folderName,
        mode: "create",
      },
    });
  }

  function deleteFolder() {
    setClickedFolderYet(false);
    setReloadDash(reloadDash - 1);
    const url = BASE_URL + "/dashboard/" + activeFolderId.folderId;
    Axios.delete(url, {
      headers: {
        Authorization: token,
      },
    })
      .then((response) => {
        // console.log("response of delete folder client", response);
      })
      .catch((err) => {
        // console.log("Dashboard client delete folder err", err);
      });
  }
  function renderOverviewPage() {
    setOverviewClick(true);
    setExtensionClick(false);
  }
  function renderExtensionPage() {
    setOverviewClick(false);
    setExtensionClick(true);
  }
  function redirectToExtn() {
    console.log("redirect to extn");
  }
  function openEditorWithGivenParamz(langSelected, startWithBoilerPlate){
    console.log("lang selected", langSelected, startWithBoilerPlate);
  }
  return (
    <>
      <div className="web_ext_switch">
        <div
          className={
            isOverviewClicked
              ? "web_ext_switch_item web_ext_switch_item_active"
              : "web_ext_switch_item"
          }
        >
          <p onClick={renderOverviewPage}>Overview</p>
        </div>
        <div
          className={
            isExtensionClicked
              ? "web_ext_switch_item web_ext_switch_item_active"
              : "web_ext_switch_item"
          }
        >
          <p onClick={renderExtensionPage}>Extension</p>
        </div>
      </div>
      {isAddNewFolderClicked && (
        <InputModal
          entityName={"folder"}
          onCreateNewFolder={(data) => {
            createNewFolder(data);
            setAddNewFolder(false);
          }}
          // onCreateNewSnippetMetaData={(data)=>console.log("snippet data ", data)}
          // folderDetails={(newFolderDetails) => {setNewFolderDetails}}
          onCloseModal={() => {
            setAddNewFolder(false);
          }}
        />
      )}
      {/* {isAddNewFolderClicked &&  
        <LangModal 
          onCloseModal={()=>setAddNewFolder(false)}
          onDoneSelectingLang = {openEditorWithGivenParamz} />} */}
      <div className="content-pane">
        <div className="content-container">
          <div className="left-pane">
            <div className="folder-container">
              <div className="top-pane">
                <p className="side-heading all-caps pane-heading">collection</p>
                <div className="img-cont">
                  <img
                    className="icon-d lg-icon link-item"
                    onClick={() => {
                      setAddNewFolder(true);
                    }}
                    src={addFolderIcon}
                  />
                  <div className="img-bg">
                    <p className="img-desc">create new folder</p>
                  </div>
                </div>
              </div>
              <Folder folders={folders} onClick={getSnippetsOfAFolder} />
              <div className="folders-list"></div>
            </div>
          </div>
          <div className="middle-pane">
            {isOverviewClicked ? (
              <div className="overview-content">Overview content</div>
            ) : (
              <div className="extension-content">Extension Content</div>
            )}
          </div>
          <div className="right-pane">
            <hr />
            <Details
              type={"folder"}
              activeFolderName={activeFolderId.folderName}
              activeFolderDesc={"hehe haha"}
              isfav={false}
              onNameChange={(e) => {
                setEntityName(e.target.value);
              }}
              onDescriptionChange={(e) => {
                setEntityDesc(e.target.value);
              }}
              showOptionals={true}
              redirectToExtn={redirectToExtn}
              deleteEntity={deleteFolder}
            />
          </div>
        </div>
      </div>
    </>
  );
  // return (
  //     <>
  //       <div className="web_ext_switch">
  //         <div
  //           className={
  //             isOverviewClicked
  //               ? "web_ext_switch_item web_ext_switch_item_active"
  //               : "web_ext_switch_item"
  //           }
  //         >
  //           <p onClick={renderOverviewPage}>Overview</p>
  //         </div>
  //         <div
  //           className={
  //             isExtensionClicked
  //               ? "web_ext_switch_item web_ext_switch_item_active"
  //               : "web_ext_switch_item"
  //           }
  //         >
  //           <p onClick={renderExtensionPage}>Extension</p>
  //         </div>
  //       </div>
  //       {isAddNewFolderClicked && (
  //         <Modal
  //           heading={"Enter folder name"}
  //           errMsg={"Invalid folder name"}
  //           onSave={createNewFolder}
  //           onTextChange={(text) => {
  //             setNewFolderName(text);
  //           }}
  //           onCloseModal={() => {
  //             setAddNewFolder(false);
  //           }}
  //         />
  //       )}
  //       <div className="content-pane">
  //         <div className="page-top-pane">
  //           <div className="page-heading">
  //             <p>Repositories</p>
  //             <p className="folders-count">{folders.length}</p>
  //           </div>
  //           <div className="dashboard-options">
  //             <div
  //               className="link-item"
  //               onClick={() => {
  //                 setAddNewFolder(true);
  //               }}
  //             >
  //               <button className="light-btn link-item">
  //                 <img src={addFolderIcon} alt="add-snippet img" />
  //                 <p>New folder</p>
  //               </button>
  //             </div>
  //             {isClickedFolderYet && (
  //               <>
  //                 <button
  //                   className="call-to-action link-item"
  //                   onClick={openEditor}
  //                 >
  //                   <img
  //                     className="expandable-btn-icon"
  //                     src={addIcon}
  //                     alt="add-snippet img"
  //                   />
  //                   <p className="expandable-btn-text">create</p>
  //                 </button>
  //                 <button
  //                   className="expandable-err-btn link-item"
  //                   onClick={deleteFolder}
  //                 >
  //                   <img
  //                     className="expandable-btn-icon"
  //                     src={trashIcon}
  //                     alt="delete-snippet img"
  //                   />
  //                   <p className="expandable-btn-text">Delete folder</p>
  //                 </button>
  //               </>
  //             )}
  //           </div>
  //         </div>
  //         <div className="bottom-pane">
  //           <div className="folders-list">
  //             <div className="folder-container">
  // {folders.map((folder) => {
  //   return (
  //     <Folder
  //       folderName={folder.name}
  //       folderId={folder.folder_id}
  //       folderDate={folder.date}
  //       onClick={getSnippetsOfAFolder}
  //     />
  //   );
  // })}
  //             </div>
  //           </div>
  //           <div className="bottom-right-pane">
  //             {isClickedFolderYet && (
  //               <div className="folder-deets">
  //                 <div className="name">{activeFolderId.folderName}</div>
  //                 <div className="date">created on {activeFolderId.date}</div>
  //               </div>
  //             )}

  //             <div className="grid-container">
  //               {isClickedFolderYet &&
  //                 folderSnippets.map((snippet) => {
  //                   return (
  //                     <Card
  //                       title={snippet.title}
  //                       date={snippet.date}
  //                       snippet_id={snippet._id}
  //                       onClick={openSnippet}
  //                     />
  //                   );
  //                 })}
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     </>
  //   );
}
