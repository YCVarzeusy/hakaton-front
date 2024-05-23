import React, { useEffect, useRef } from 'react';
import {
  Modal,
  Box,
  Typography,
  Rating,
  TextField,
  InputAdornment,
  Button,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { styled } from '@mui/system';
import { StyledModal } from '@/styles/styledComponets';
import { schemaLevel } from '@/schema/auth';
interface TechniqueModalProps {
  open: boolean;
  techniqueName: string;
  categoryName: string;
  ratingValue: number;
  power: number;
  setModal: (open: boolean) => void;
  updatePowerLevel: (power: number) => void;
}


const ModalContent = styled(Box)({
    width: "50%",
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  });


  
export default function TechniqueModal(props:TechniqueModalProps) {
    const {
        open,
        techniqueName,
        categoryName,
        ratingValue,
        power,
        setModal,
        updatePowerLevel
      } = props;
      const initialized =  useRef(false);

      const { control, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: zodResolver(schemaLevel),
        defaultValues: {power: 0}
      });
   
      useEffect(() => {
        if (open) {
          reset({ power });
        }
      }, [open, power, reset]); 
    
      
    
    const handleClose = () => {
        setModal(false)
        reset({power: 0})
    };

    const onSubmit = async ({power}:{power:number}) => {
       await  updatePowerLevel(power);
       handleClose()

    };

    const getPercentage = (power:number|undefined) =>{
        const parse = power ??  0;
        return (parse *5 ) / 100;
      } ;

      

    return (
      <StyledModal open={open} onClose={handleClose}>
        <ModalContent>
          <Box display="flex" justifyContent="space-between" alignItems={"center"}>
            <Box>
              <Typography variant="caption" sx={{color:"darkblue.main", fontWeight:"bold"}} >
                {categoryName}
              </Typography>
              <Typography variant="h6" color="info.main" sx={{fontWeight:"bold"}}>
                {techniqueName}
              </Typography>
            </Box>
            <Rating value={getPercentage(ratingValue)} readOnly />
          </Box>
          <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
            <Controller
                name="power"
                control={control}
                render={({ field }) => (
                <TextField
                    {...field}
                    label="Power"
                    variant="outlined"
                    fullWidth
                    error={!!errors.power}
                    helperText={ errors.power?.message?.toString()} 
                    InputProps={{
                    endAdornment: <InputAdornment position="end">| 100</InputAdornment>,
                    }}                         
                    onChange={(e) => {
                        const recive =e.target.value == "";
                        const value = parseInt(e.target.value, 10); 
                        field.onChange( recive ? e.target.value: value); 
                      }}
                />
                )}
            />
            <Box display="flex" justifyContent="flex-end" gap="8px"sx={{paddingTop: "1rem"}} >
                <Button variant="outlined" color="secondary" onClick={handleClose}>
                Cancelar
                </Button>
                <Button variant="contained" color="primary" type="submit">
                Guardar
                </Button>
            </Box>
          </form>
        </ModalContent>
      </StyledModal>
    );
  };