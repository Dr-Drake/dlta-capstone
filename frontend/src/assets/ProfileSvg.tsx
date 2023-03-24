import * as React from "react"
import { SVGProps } from "react"

const ProfileSvg = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={39}
    height={41}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M19.5 1.957C9.835 1.957 2 10.141 2 20.236s7.835 18.278 17.5 18.278S37 30.331 37 20.236c0-10.095-7.835-18.279-17.5-18.279Z"
      stroke="#000"
      strokeWidth={3}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M5.974 31.835s3.9-5.201 13.526-5.201c9.625 0 13.526 5.201 13.526 5.201M19.5 20.236c2.9 0 5.25-2.455 5.25-5.484 0-3.028-2.35-5.483-5.25-5.483s-5.25 2.455-5.25 5.483c0 3.029 2.35 5.484 5.25 5.484Z"
      stroke="#000"
      strokeWidth={3}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export default ProfileSvg;
