import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface MessageWindow {
  isActive: boolean
}

interface Aux {
  messageModal: MessageWindow
  infoMessages: string[]

}

const initialState: Aux = {
  messageModal: {
    isActive: false,
  },
  infoMessages: []
}

export const auxiliarySlice = createSlice({
  name: "aux",
  initialState,
  reducers: {
    controlMessageModal: (state, action: PayloadAction<boolean>) => {
      state.messageModal.isActive = action.payload
    },
  },
})

export default auxiliarySlice.reducer

export const { controlMessageModal } = auxiliarySlice.actions
