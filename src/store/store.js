import { create } from "zustand";

const useStore = create((set) => ({
    openRightNav: false,
    setOpenRightNav: (open) => set({ openRightNav: open }),
    toggleRightNav: () => set((state) => ({ openRightNav: !state.openRightNav })),
    preview: false,
    setPreview: (preview) => set({ preview }),
    togglePreview: () => set((state) => ({ preview: !state.preview })),
    rightNavData: null,
    setRightNavData: (data) => set({ rightNavData: data }),
    charts: [],
    setCharts: (charts) => set({ charts }),
    updateChart: (index, newChart) => set((state) => {
        const updatedCharts = state.charts.map((chart, idx) =>
            idx === index ? newChart : chart
        );
        localStorage.setItem('chartsData', JSON.stringify(updatedCharts));
        return { charts: updatedCharts };
    }),
    addChart: (newChart) => set((state) => {
        const updatedCharts = [...state.charts, { ...newChart, id: Date.now() }];
        localStorage.setItem('chartsData', JSON.stringify(updatedCharts));
        return { charts: updatedCharts };
    }),
    removeChart: (index) => set((state) => {
        const updatedCharts = state.charts.filter((_, idx) => idx !== index);
        localStorage.setItem('chartsData', JSON.stringify(updatedCharts));
        return { charts: updatedCharts };
    }),
}));

export default useStore;
