import { IAppTheme } from "mui-app-theme";
import { Typography } from "mui-typography";
import React, { FunctionComponent, useEffect, useState } from "react";

import { Fab, Grid, makeStyles } from "@material-ui/core";
import { Add } from "@material-ui/icons";

import { Translate } from "@utils/translates/Translate";
import { IssuePanel } from "./IssuePanel/IssuePanel";
import { Issues } from "./Issues/Issues";
import { Filters } from "./Filters/Filters";

const useStyles = makeStyles((theme: IAppTheme) => ({
    page: {
        minHeight: "100%",
    },
    header: {
        height: 96,
        padding: "24px 24px 16px",
    },
    addButton: {
        position: "absolute",
        bottom: 20,
        right: 24,
        zIndex: 1,
    },
}));

export interface IIssuesPageCallProps {
    loadIssues: () => void;
    openIssueToCreate: (openIssuePanel) => void;
    openIssueToEdit: (issueId: number, openIssuePanel: () => void) => void;
    closeIssue: (closeIssuePanel: () => void) => void;
}

type Props = IIssuesPageCallProps;

const IssuesPage: FunctionComponent<Props> = (props) => {
    const {
        loadIssues,
        openIssueToCreate,
        openIssueToEdit,
        closeIssue,
    } = props;

    const classes = useStyles();
    const [ isOpen, setIsOpen ] = useState<boolean>(false);

    const createIssue = () =>
        openIssueToCreate(() => setIsOpen(true));

    const openIssue = (issueId: number) =>
        openIssueToEdit(issueId, () => setIsOpen(true));

    const onCloseIssue = () => closeIssue(() => setIsOpen(false));

    useEffect(() => {
        loadIssues();
    }, []);

    return (
        <Grid container direction={"column"} className={classes.page}>

            <Grid item container className={classes.header} justify={"space-between"} alignItems={"center"}>
                <Typography size={700} color={"strong"} component={"p"}>
                    {Translate.getString("Issues")}
                </Typography>

                <Filters/>
            </Grid>

            <Issues openIssue={openIssue}/>

            <Fab color="primary" aria-label="add" onClick={createIssue} className={classes.addButton}>
                <Add/>
            </Fab>

            <IssuePanel isOpen={isOpen} close={onCloseIssue}/>
        </Grid>
    );
};

export { IssuesPage };
