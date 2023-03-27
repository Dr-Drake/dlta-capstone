/**
 * @jest-environment jsdom
 */


import HomePage, { HomePageProps } from '@/pages';
import { render, fireEvent, screen } from '@testing-library/react';
import { Profile } from "@/types/Profile";
import { ApolloProvider } from '@apollo/client';
import apolloClient from '@/config/apollo-client';

// Mock the useProfiles hook to return dummy data
let dummyProfiles: Profile[] = [
    {
        id: "1",
        name: "John Doe",
        role: "Software Developer",
        picture: "/sample.png",
        "bio": "I am number 1",
        "location": "Kigali, Rwanda"
    },
    {
        id: "2",
        name: "Jane Smith",
        role: "Software Developer",
        picture: "/sample.png",
        "bio": "I am number 12",
        "location": "Lagos, Nigeria"
    },

]
jest.mock('../hooks/useProfiles', () => ({
    useProfiles: jest.fn(() => ({
      data: {
        data: dummyProfiles
      },
      isLoading: false,
      error: null,
      refetch: jest.fn(),
    })),
}));

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


describe('HomePage', () => {
    test('renders the welcome message', () => {
        render(
            <ApolloProvider client={apolloClient}>
                <HomePage />
            </ApolloProvider>
        );
        screen.debug();
        const welcomeMessage = screen.getByText(/Welcome to DLTA Profiles/i);
        console.log(welcomeMessage);
        // expect(welcomeMessage).toBeInTheDocument();
    });

    // test('renders profile cards', () => {
    //     render(<HomePage />);
    //     const profileCards = screen.getAllByTestId('profile-card');
    //     expect(profileCards.length).toBe(2);
    // });

    // test('filters profiles based on search input', () => {
    //     render(<HomePage />);
    //     const searchInput = screen.getByTestId("search-profiles");

    //     fireEvent.change(searchInput, { target: { value: 'doe' } });

    //     const profileCards = screen.getAllByTestId('profile-card');
    //     expect(profileCards.length).toBe(1);
    //     expect(profileCards[0]).toEqual({
    //         id: "1",
    //         name: "John Doe",
    //         role: "Software Developer",
    //         picture: "/sample.png",
    //         "bio": "I am number 1",
    //         "location": "Kigali, Rwanda"
    //     })
    // });
  
  // Add more tests here as needed
});
