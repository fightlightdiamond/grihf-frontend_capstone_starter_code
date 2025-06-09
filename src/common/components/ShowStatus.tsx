import {Alert, Spinner} from "flowbite-react";
import { HiInformationCircle } from "react-icons/hi";
import {EStatus} from "../abstracts/enums";

const ShowStatus = (props: {
    status: EStatus,
    error: string | null
}) => {
    const {status, error} = props;

    return <div>
        {status === EStatus.loading ? <div className="flex flex-wrap gap-2">
            <Spinner color="info" aria-label="Info spinner example"/>
            <Spinner color="success" aria-label="Success spinner example"/>
            <Spinner color="failure" aria-label="Failure spinner example"/>
            <Spinner color="warning" aria-label="Warning spinner example"/>
            <Spinner color="pink" aria-label="Pink spinner example"/>
            <Spinner color="purple" aria-label="Purple spinner example"/>
        </div> : ''}
        {status === EStatus.failed ?
            <Alert color="failure" icon={HiInformationCircle}>
                {error}
            </Alert> : ''}
    </div>
}

export default ShowStatus