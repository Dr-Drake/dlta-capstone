import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';

export function withServerSideAuthentication(gssp: GetServerSideProps) {
    
    let customGsspCallback: GetServerSideProps = async(context)=>{
        const session = await getSession(context);

        if (!session) {
            return {
                redirect: {
                    destination: '/login',
                    permanent: false,
                },
            };
        }


        return gssp(context);
    }

    return customGsspCallback;
}