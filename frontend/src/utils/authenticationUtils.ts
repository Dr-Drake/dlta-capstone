import { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth/next';

export function withServerSideAuthentication(gssp: GetServerSideProps) {
    
    let customGsspCallback: GetServerSideProps = async(context)=>{
        const session = await getServerSession(context.req, context.res, {});

        if (!session) {
            return {
                redirect: {
                    destination: '/login',
                    permanent: false,
                },
            };
        }

        const gsspData: any = await gssp(context)

        return {
            props: {
                ...gsspData?.props,
                session
            }
        };
    }

    return customGsspCallback;
}

export function withServerSideAuthPageProtection(gssp: GetServerSideProps) {
    
    let customGsspCallback: GetServerSideProps = async(context)=>{
        const session = await getServerSession(context.req, context.res, {});

        if (session) {
            return {
                redirect: {
                    destination: '/',
                    permanent: false,
                },
            };
        }

        const gsspData: any = await gssp(context)

        return {
            props: {
                ...gsspData?.props,
                session
            }
        };
    }

    return customGsspCallback;
}