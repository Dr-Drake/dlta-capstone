import React, { Component, RefObject } from "react";
import { Modal, ModalOptions } from "flowbite";
import { CgSpinner } from "react-icons/cg";
import { BiLink } from "react-icons/bi";
import { youtubeParser } from "@/utils/stringFormatUtils";
import CustomButton from "./CustomButton";
import { Project } from "@/types/Profile";

export interface CustomProjectModalProps{
    ref?: Function;
    project?: Partial<Project>;
    name?: string;
}

export interface CustomProjectModalState{
    isLoading: boolean;
    [key: string] : any;
}

class CustomProjectModal extends Component<CustomProjectModalProps, CustomProjectModalState>{

    // Instance variables
    private _modalRef?: RefObject<HTMLDivElement> | null;
    private modal?: Modal;
    private loadingClasses = "skeleton [&>*]:opacity-0";

    constructor(props: CustomProjectModalProps){
        super(props);
    
        this.state = {
            isLoading: true,
        };

        this._modalRef = React.createRef<HTMLDivElement>();
        this.hide = this.hide.bind(this); 
        this.handleOnLoad = this.handleOnLoad.bind(this);
    }

    componentDidMount = () => {

        const options: ModalOptions = {
            placement: 'center',
            backdrop: 'dynamic',
            backdropClasses: 'bg-gray-900 bg-opacity-70 dark:bg-opacity-80 fixed inset-0 z-40',
            closable: true,
            onHide: () => {
                console.log('modal is hidden');
            },
            onShow: () => {
                console.log('modal is shown');
            },
            onToggle: () => {
                console.log('modal has been toggled');
            }
        };

        if (this._modalRef?.current) {
            this.modal = new Modal(this._modalRef.current, options)
        }
    }

    open(){
        this.modal?.show();
    }

    hide(){
        this.modal?.hide();
    }

    handleOnLoad(){
        this.setState((prevState)=>(
            {
                ...prevState,
                isLoading: false
            }
        ))
    }
    

    render(): React.ReactNode {

        let { project, name } = this.props
        return(
            <div ref={this._modalRef} id="modalEl" tabIndex={-1} aria-hidden="true" className="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] md:h-full">
                <div className="relative w-full h-full max-w-4xl md:h-auto">

                    {/** Modal Content */}
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 pb-3">

                        {/** Modal header */}
                        <div className="flex items-start justify-between px-3 pt-3 rounded-t dark:border-gray-600">
                            <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                onClick={this.hide}
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>  
                            </button>
                        </div>
                        
                        {/** Modal body  */}
                        <div className="py-3 px-5 sm:px-10">
                            <div className={this.state.isLoading ? 'bg-black relative' : undefined}>
                                <iframe
                                    loading="lazy"
                                    onLoad={this.handleOnLoad}
                                    className="w-full aspect-video" 
                                    src={`https://www.youtube.com/embed/${youtubeParser(project?.youtube || '')}`}
                                    //src="https://www.youtube.com/watch?v=eTpkgNBmrX8"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                               
                                {
                                    this.state.isLoading &&
                                    <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] ">
                                        <CgSpinner className="animate-spin" 
                                            size={50}
                                            color="white"
                                        />
                                    </div>
                                }
                            </div>
                        </div>
                        <div className="px-5 pb-5 sm:px-10">
                            <p>{ project?.projectName } presented by { name }</p>

                            {/** GitHub Link */}
                            <div className="flex my-5">
                                <BiLink size={25} className="mr-1"/>
                                <p className="font-bold text-sm sm:text-base">
                                    GitHub Link: 
                                    <span className="text-buttonBlue font-normal">
                                        <a href={`${project?.github}`}> { project?.github }</a>
                                    </span>
                                </p>
                            </div>

                            {/** Project Description */}
                            <p className="text-sm sm:text-base">
                                <span className="font-bold">Project Description: </span>
                                { project?.description }
                            </p>
                            
                            {/** Technologies Used */}
                            <div className="flex items-center gap-3 mt-5 flex-wrap">
                                <p className="font-bold text-sm sm:text-base">Technologies that were used: </p>
                                
                                <div className="flex items-center gap-3">
                                    {
                                        project?.technologies?.map((tech, i)=>(
                                            <CustomButton className="!rounded-3xl font-normal text-sm !py-1" 
                                                key={`${i}tch`}
                                            >
                                                { tech }
                                            </CustomButton>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                        
                        
                    </div>
                </div>
            </div>
        )
    }
}

export default CustomProjectModal