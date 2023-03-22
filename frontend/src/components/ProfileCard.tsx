import React from "react";
import Image from "next/image";
import sampleLogo from "@/assets/sample.png";
import CustomButton from "./CustomButton";

const ProfileCard: React.FC<any> = ()=>{

    return(
        <div className="border rounded-lg border-borderGray p-3 w-full lg:w-[350px]">

            {/** Top Section */}
            <div className="flex items-center justify-between">
                <Image 
                    src={sampleLogo} 
                    alt="sample logo" 
                    className='w-[60px] h-[60px] rounded-full'
                />
                <div>
                    <p className="text-[20px]">Umuhuza Clever</p>
                    <p className="text-[13px] text-borderGray">Front-end Developer</p>
                </div>
            </div>

            {/** Button */}
            <div className="mt-[50px]">
                <CustomButton className="text-sm block font-semibold rounded-full mx-[auto]">
                    View Dev
                </CustomButton>
            </div>
        </div>
    )
}

export default ProfileCard;