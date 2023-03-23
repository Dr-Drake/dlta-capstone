import React from "react";
import Image from "next/image";
import CustomButton from "./CustomButton";
import { Profile } from "@/types/Profile";
import sampleImage from "@/../public/sample.png"
import { useRouter } from "next/router";

export interface ProfileCardProps extends Partial<Profile>{}

const ProfileCard: React.FC<ProfileCardProps> = ({
    picture, name, role, id
})=>{

    // Hooks
    const router = useRouter();

    // Handlers
    const handleViewProfile = ()=>{
        router.push(`/${id}`);
    }

    return(
        <div className="border rounded-xl border-borderGray p-3 w-full lg:w-[360px] flex sm:flex-col">

            {/** Top Section */}
            <div className="flex items-center gap-2">
                <Image 
                    src={sampleImage} 
                    loader={()=> picture || '/sample.png'}
                    alt={name || "sample photo"} 
                    placeholder='blur'
                    className='w-[40px] h-[40px] sm:w-[60px] sm:h-[60px] rounded-full object-cover object-center'
                />
                <div className="hidden sm:block flex-1"></div>
                <div>
                    <p className="text-[12px] sm:text-[20px]">{ name }</p>
                    <p className="text-[10px] sm:text-[13px] text-borderGray">{ role }</p>
                </div>
            </div>

            {/** Spacer */}
            <div className="flex-1"></div>

            {/** Button */}
            <div className="mt-none sm:mt-[40px]">
                <CustomButton 
                    className="!block text-[10px] sm:text-sm font-semibold !rounded-3xl mx-[auto]"
                    onClick={handleViewProfile}
                >
                    View Dev
                </CustomButton>
            </div>
        </div>
    )
}

export default ProfileCard;