import React from "react";
import Image from "next/image";
import CustomButton from "./CustomButton";
import { getIcon, IconHash } from "@/utils/getIcon";
import { Modal } from 'flowbite-react'
import CustomProjectModal from "./CustomProjectModal";
import { Project } from "@/types/Profile";

export interface ProjectCardProps extends Partial<Project>{
    name?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = (props)=>{

    // Props
    let {
        name,
        projectName,
        description
    } = props

    // Refs
    let modal: CustomProjectModal | null;

    // Handlers
    const handleViewProject = ()=>{
        modal?.open();
    }

    return(
        <React.Fragment>
            <CustomProjectModal
                ref={(r)=> modal = r}
                name={name}
                project={props}
            />
            <div className="border rounded-xl border-borderGray p-4 w-full lg:w-[390px] flex flex-col">

                {/** Top Section */}
                <div className="flex items-center gap-5">
                    { getIcon(projectName as keyof IconHash) }
                    <p className="text-[22px] sm:text-[26px]">
                        { projectName }
                    </p>
                </div>

                {/** Description */}
                <p className="font-light text-[14px] mt-6">
                    { description }
                </p>

                {/** Spacer */}
                <div className="flex-1"></div>

                {/** Button */}
                <div className="mt-3 sm:mt-[40px]">
                    <CustomButton className="text-[10px] sm:text-sm font-semibold rounded-xl w-full"
                        onClick={handleViewProject}
                    >
                        View Project
                    </CustomButton>
                </div>
            </div>
        </React.Fragment>
    )
}

export default ProjectCard;