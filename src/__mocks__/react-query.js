module.exports = {
    ...jest.requireActual('..'),
    __esModule      : true,
    useQuery        : jest.fn().mockReturnValue({ isLoading : true })
}