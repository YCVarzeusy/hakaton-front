'use client'

import Image from "next/image";
import styles from "./page.module.css";
import { 
  Card, CardContent, Typography, TextField, Button, Grid, 
  CircularProgress, CardHeader, Avatar, AvatarGroup, InputAdornment, Box 
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { schemaAuth } from "@/schema/auth";

import AccountCircle from '@mui/icons-material/AccountCircle';
import KeyIcon from '@mui/icons-material/Key';
import { readUserSession, signInWidthEmailAndPassword } from "@/api/auth";
import { SignInInterface } from "@/interface/auth";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
        toast.loading('Verificando información ...', {
            position: 'top-right',
        });
        try {
            setLoading(true); 
            const {data} = await readUserSession();
            if(data?.session) {
              await toast.success('Bienvenido',{duration: 3000})
              setLoading(false); 
              router.push("/fighter")
            }
            else {
              toast.error("Error en la autenticación")
              setLoading(false)
            }
        } catch (error) {
            toast.error('Error al verificar datos' ,{duration: 3000});
        } finally {
            toast.dismiss();
            setLoading(false)
        }
    };
    fetchData();
  }, []);

  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schemaAuth),
    defaultValues: {email:"admin@test.com", password:"123456"}
  });

  const onSubmit = async (data: SignInInterface) => {
      toast.loading('Autenticando información ...', {
          position: 'top-right',
      });
      try {
          setLoading(true); 
          const session = await signInWidthEmailAndPassword(data);
          if(!session.result.error) {
            await toast.success('Bienvenido',{duration: 3000})
            setLoading(false); 
            router.push("/fighter")
          }
          else {
            toast.error("Error en la autenticación")
            setLoading(false)
          }
      } catch (error) {
          toast.error('Error al cargar datos' ,{duration: 3000});
      } finally {
          toast.dismiss();
          setLoading(false)

      }
  };



  return (
    <Grid container justifyContent={"center"} alignItems="center" sx={{height: "100vh", minWidth: "550px", overflow:"hidden"}}>
        <Grid item container xs={12} sx={{position: "fixed", top:0,  width:"100vw", height:"50vh", zIndex:"0" }}> 
          <Grid item xs={7.9} sx={{ backgroundColor: "darkblue.main", height: "100vh" }}>
            <Box sx={{ padding: "4rem", display: "flex", flexDirection: "row", alignItems: "center" }}>
              <Typography variant="h2" color="white" sx={{ marginRight: "1rem" }}>
                Ever
              </Typography>
              <Typography variant="h2" color="primary">
                Watch
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={0.2} sx={{ backgroundColor: "info.main", height: "100vh" }}>
          </Grid>
          <Grid item xs={3.9}  sx={{ backgroundColor: "secondary.main", height: "100vh" }}>
          </Grid>
        </Grid>
        <Grid item xs={11} sm={9} md={7} lg={5} xl={4} sx={{zIndex: "1"}}>
              <Card sx={{overflow: "inherit", paddingTop:"2rem"}}>
                <CardContent>
                  <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
                    <Grid container spacing={2} justifyContent={"center"}>
                      <Grid item xs={10}>
                        <Box sx={{ display: 'flex', alignItems: "center" }}>
                        <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5, fontSize:35 }} />
                        <Controller
                          name="email"
                          control={control}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              label="Email"
                              variant="filled"
                              fullWidth
                              error={!!errors.email}
                              helperText={ errors.email?.message?.toString()}                            
                            />
                          )}
                        />
                      </Box>
                      </Grid>
                      <Grid item xs={10}>
                        <Box sx={{ display: 'flex', alignItems: "center" }}>
                          <KeyIcon sx={{ color: 'action.active', mr: 1, my: 0.5, fontSize:35 }} />
                          <Controller
                            name="password"
                            control={control}
                            render={({ field }) => (
                              <TextField
                                {...field}
                                label="Contraseña"
                                variant="filled"
                                fullWidth
                                type="password"
                                error={!!errors.password}
                                helperText={errors.password?.message?.toString()}
                            
                              />
                            )}
                          />
                        </Box>
                      </Grid>
                      <Grid item xs={10} container justifyContent={"end"}>
                        <Grid item xs={5}>
                            <Button variant="contained" fullWidth type="submit" disabled={loading === true}>
                            {!loading && ( <Typography>Ingresar</Typography>)}
                              {loading && (
                                <CircularProgress
                                  size={24}
                                  color="secondary"
                                />
                              )}
                            </Button>
                          </Grid>
                      </Grid>
                      
                    </Grid>
                  </form>
                </CardContent>
              </Card>
        </Grid>
    </Grid>
  );
}
