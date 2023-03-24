/**
 * @jest-environment jsdom
 */

import HomePage, { HomePageProps } from "@/pages";
import { render, screen } from '@testing-library/react';
import { SessionProvider } from "next-auth/react";
import apolloClient from '@/config/apollo-client';
import { ApolloProvider } from '@apollo/client'

// Mock the data that is fetched by getServerSideProps
const mockProps: HomePageProps = {
    providers: {},
};
  
// Provide a mocked implementation of getServerSideProps
jest.mock('@/pages/index', () => ({
    __esModule: true,
    default: () => null,
    getServerSideProps: async () => ({
      props: mockProps,
    }),
}));

test('should render the correct title', () => {
    render(
        <ApolloProvider client={apolloClient}>
            <HomePage />
        </ApolloProvider>
    );
    const title = screen.getByTestId('page-title');
    expect(title).toHaveTextContent('Welcome to DLTA Profiles');
});
  