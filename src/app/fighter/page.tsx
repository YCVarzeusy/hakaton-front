
"use client"

import { useEffect, useRef, useState } from 'react';
import styles from "../page.module.css";
import { 
    Drawer, List, ListItem, ListItemText, IconButton, 
    Hidden, Divider, Box, Container, Grid, Card, CardContent,
    Typography, Avatar, AvatarGroup, InputAdornment, TextField
} from '@mui/material';
import Show from '@/components/shared/show';
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { listFighters, listTechnique } from '@/api/fighters';
import { techiniqueInterface } from '@/interface/technique';
import { fighterInterface } from '@/interface/fighters';
import AvatarCustom from '@/components/shared/avatar';
import StarIcon from '@mui/icons-material/Star';
import { StyledAvatarGroup } from '@/styles/styledComponets';
import SearchIcon from '@mui/icons-material/Search';




export default function FighterHome()  {
    const [loadingF, setLoadingF] = useState(false);
    const [techniqueList, setTechniqueList] = useState([] as any[]);
    const [fightersList, setFightersList] = useState([] as any[]);
    const initialized =  useRef(false);
    
    useEffect(() => {
        const fetchData = async () => {
            toast.loading('Cargando Peleadores ...', {
                position: 'top-right',
            });
            try {
                setLoadingF(true); 
                const {data, error} = await listTechnique();
                if(data) setTechniqueList(data as techiniqueInterface[]) 

                const fighters = await listFighters();
                console.log(fighters.data);
                if(fighters.data) setFightersList(fighters.data as fighterInterface[]) 

            } catch (error) {
                toast.error('Error al verificar datos' ,{duration: 3000});
            } finally {
                toast.dismiss();
                setLoadingF(false)
            }
        };
        !initialized.current && fetchData();
        initialized.current = true
    }, []);



    return (
            <Grid container  sx={{  backgroundColor: "darkblue.main", with: "100vw", height:"100vh",}}>
              <Grid item xs={12} container spacing={2}>
                    <Grid item xs={6} sm={6} md={4} >
                        <Box  sx={{padding: "1rem"  }}>
                            <Grid container className="scroll" sx={{backgroundColor: "gray.main", height: "calc(100vh - 32px)", overflowX:"auto",}}>
                                <Grid  item xs={12} >
                                <TextField
                                    color='secondary'
                                    label="Peleador"
                                    id="standard-start-adornment"
                                    sx={{
                                    m: 1,
                                    width: '94%',
                                    borderRadius: "4px 4px 0 0",
                                    backgroundColor: 'white', // Establece el fondo a blanco
                                    '& .MuiFilledInput-root': {
                                        backgroundColor: 'white', // Asegura que el fondo del input sea blanco
                                    },
                                    }}
                                    InputProps={{
                                    endAdornment: <InputAdornment position="start">
                                        <SearchIcon/>
                                    </InputAdornment>,
                                    }}
                                    variant="filled"
                                />
                                </Grid>
                                
                                
                                {fightersList.map((fighter:fighterInterface, index:number) => (
                                    <Grid key={index} item xs={12} sx={{ padding: "0.5rem", borderRadius: "1rem"}}  >
                                        <Card  sx={{backgroundColor: "darkblue.main"}} >
                                            {/* <Avatar src={fighter.avatar_url} sx={{ width: 100, height: 100, margin: 'auto' }} /> */}
                                            <CardContent sx={{padding:"1rem"}} >
                                                <Grid container>
                                                    <Grid item xs={3} >
                                                        <AvatarCustom imageUrl={fighter.avatar_url} />
                                                    </Grid>
                                                    <Grid item xs={9} container justifyContent={"center"} alignItems="center" >
                                                        <Grid item xs={10} >
                                                            <Typography variant="subtitle2" color="white" align="center" gutterBottom>
                                                            {fighter.name}{" "}{fighter.last_name}
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item xs={6}  >
                                                            <StyledAvatarGroup
                                                                renderSurplus={(surplus) =>  
                                                                <span>+{surplus.toString()[0]}</span>
                                                                }
                                                                spacing={8}
                                                                total={10}
                                                                max={5}
                                                                >
                                                                <Avatar >
                                                                    <StarIcon sx={{ color: 'darkblue.main' }} />
                                                                </Avatar>
                                                                <Avatar >
                                                                    <StarIcon sx={{ color: 'darkblue.main' }} />
                                                                </Avatar>
                                                                <Avatar >
                                                                    <StarIcon sx={{ color: 'darkblue.main' }} />
                                                                </Avatar>   
                                                            </StyledAvatarGroup>
                                                        </Grid>
                                                        <Grid item xs={4} >
                                                            <Typography variant="h5" color="white" align="center" gutterBottom>
                                                                10k
                                                            </Typography>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                    ))}
                            </Grid>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} sx={{backgroundColor: "gray.main"}} >
                        
                    </Grid>
                    <Grid item xs={12} sm={12} md={2} sx={{backgroundColor: "gray.main"}}>
                    
                    </Grid>
              </Grid>
            </Grid>
    )

}
