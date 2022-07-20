import React from 'react';
declare module "*.jpg" {
    export default "" as string;
}
declare module "*.png" {
    export default "" as string;
}
export interface AlertType {
    type: string,
    message?: string,
}

export interface OnBoardingFormValues {
    email?: string
    userName?: string
    password?: string
    confirmPassword?: string
    firstName?: string
    lastName?: string
    bizName?: string
    country?: string
    phoneNumber?: string
    howHear?: string
    bizAddr?:string
}
export interface FundWalletValues {
    business: string
    account: string
    unit: string
    charge: string
}

export interface ModalProps {
    childComponent?: React.ReactNode
    modalTrigger: React.ReactNode
    modalHeading?: any
    showModal?: boolean
    callShowModal?(): any
}

export interface NewUserValues {
    firstName: string
    lastName: string
    email: string
    phoneNumber: string
    businessRoleId: number
}

export interface NewBizValues {
    firstName: string
    lastName: string
    email: string
    phoneNumber: string
    bizName: string
    state?: string
    country?:string
    address: string
    account?: string
    howHear?:string
    
}
export interface NewRolesValues {
    role: string
    desc: string
}
export interface ActivateBorderlessValues {
    currency: string
    max: string
}

export interface FundBorderlessValues {
    amount: string
    ref: string
    narration: string
}

export interface GatewayDetailsValues {
    url: string
    clientId: string
    clientSecret: string
    nonce: string
}

export interface NotificationAlertProps {
    type: string
    notifyId: string
    hasheader?: boolean
    message: string
    headerText?: string
    isTriggered: boolean
}

export interface ChildrenCompProps {
    childComponent?: React.ReactNode
    pageHeadingTitle: string
    hasSearchBar?: boolean
    breadcrumbs?: string
    activeBreadcrumbs?: boolean
}

export interface FilterSearchProps {
    childComponent?: React.ReactNode
    filterTxt?: string
    searchTxt?: string
    hasFilter?: boolean
    canExportPdf?: boolean
    canSearch?: boolean
    isFetching?:boolean
    exportPdfCallback?(): any
    callback(...args): any
    otherCtas?: React.ReactNode
    filterOptions?:any
    // hasSearchBar?:boolean
    // breadcrumbs?:string
}

export interface RowActionsProps {
    childComponent?: React.ReactNode
    className?: string
}

export interface TableProps {
    childComponent?: React.ReactNode
    waitingState?: React.ReactNode
    classnames?: string
    isEmptyRecords?: boolean
    hasCta?: boolean
    hasCtaText?: string
    ctaCallback?(): any
    isFailed?:boolean
    failureMsg?:string
    emptyRecordsMessage?: string
    hasRequested?:boolean
    requestStatus?:boolean
}

export interface WindowResolutions {
    width: number;
    height: number
}

// export interface screenResolutionProps{
//     width: number;
//     height: number;
// }

export interface HeaderProps {
    pageHeadingTitle: string;
    screenResolution: WindowResolutions;
    hasSearchBar?: boolean
    breadcrumbs?: string
    activeBreadcrumbs?: boolean
    callback?: () => boolean
}



export interface NewVirtualAcctValues {
    firstName: string
    lastName: string
    middleName?:string
    email?: string
    phoneNumber?: string
    dateOfBirth?: any
    gender: string
    currency?: string
    biometricID: string
    state?: string
    address?: string
    preferedAccountName: string
}

export interface NewTerminalValues {
    providerName: string,
    providerServiceKey: string,
    providerID: number,
    description: string
}

export interface TerminalProviderValues {
    terminalProvider: string,
    deviceName: string,
    deviceID: number,
    serialNumber: string
}

export interface allocatedTerminalValues {
    terminalProvider: string,
    accountNumber: string,
    deviceID: number
}

export interface Auth {
    user: Object,
    accessToken: string
}
export interface LoginFormValues {
    userName: string
    password: string
}

export interface ILoginProps {
    login?: (values: LoginFormValues) => Promise<void>;
}

export interface AuthContextType {
    auth: Auth | undefined,
    setAuth: (auth: Auth) => void
}

export interface PrivateRoutes {
    isAllowed?:boolean
    redirectPath?:string
    children:any
}


export interface ApiRequestType {
    url: string
    http_method: string
    data?: any
    headers?: any
    noStringify?: boolean
    responseType?: string
}


export interface ReducerParams {
    state: any 
    action: any
}

