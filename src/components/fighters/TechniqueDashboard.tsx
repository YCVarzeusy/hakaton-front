import React, { useState } from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Card,
  CardContent,
  Grid,
  Typography,
  Rating,
  Box
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { techiniqueInterface } from '@/interface/technique';
import { StyledAccordion } from '@/styles/styledComponets';
import { levelInterface } from '@/interface/level';
import TechniqueModal from './modalLevel';
import { fighterInterface } from '@/interface/fighters';
import { toast } from 'sonner';
import { insertLevelToFighter } from '@/api/fighters';

interface TechniqueDashboardProps {
  techniques: techiniqueInterface[];
  levels: levelInterface[]
  fighter?: fighterInterface;
  selectFighter: (fighter: fighterInterface) => void;
  updateListFighter: () => void;
}

interface updateLevelProps {
  technique: techiniqueInterface;
  level?: levelInterface;
}

export default function TechniqueDashboard (props: TechniqueDashboardProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [powerLevel, setPowerLevel] = useState<levelInterface | undefined>(undefined);
  const [technique, setTechnique] = useState<techiniqueInterface | null>(null);
  const { techniques, levels, fighter, selectFighter, updateListFighter } = props;
    
  const groupByCategory = (items: techiniqueInterface[]) => {
  
    return items.reduce((groups, item) => {
      const category = item.categoria;
      if (!groups[category]) {
        groups[category] = [];
      }
      groups[category].push(item);
      return groups;
    }, {} as { [key: string]: techiniqueInterface[] });
  };
    
  const groupedTechniques = groupByCategory(techniques);

  const OpenModalLevel = ({ level, technique }: updateLevelProps) => {
    if (fighter){
      setModalOpen(true);
      setPowerLevel(level);
      setTechnique(technique);
    }
  };

  const updatePowerLevel = async (power: number) => {
        toast.loading('Cargando Nivel de pelea ...', {
          position: 'top-right',
      });
      try {
          const {data, error} = await insertLevelToFighter((fighter?.id!).toString(), {power, technique_id: technique?.id});
          if(data) setModalOpen(false);

      } catch (error) {
          toast.error('Error al verificar datos' ,{duration: 3000});
      } finally {
          toast.dismiss();
          setModalOpen(false)
          selectFighter(fighter!);
          updateListFighter();
      }
  }
  const getPercentage = (power:number|undefined) =>{
    const parse = power ??  0;
    return (parse *5 ) / 100;
  } ;


  return (
    <Box sx={{padding:"1rem"}}>
      {Object.keys(groupedTechniques).map((category) => {
        const totalTechniques = groupedTechniques[category].length;
        const techniquesWithValue = groupedTechniques[category].filter((technique) => 
        levels.some((level) => level.technique_id === technique.id)
        ).length;
        return (
          <StyledAccordion key={category} defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>{category} ({techniquesWithValue}/{totalTechniques})</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                {groupedTechniques[category].map((technique) => {
                  const found = levels.find((level) => level.technique_id === technique.id);
                  return (
                    <Grid item xs={12} sm={6} md={4} key={technique.id}>
                    <Card sx={{ backgroundColor: 'info.main', minHeight: "150px", height:"100%", cursor: 'pointer'}}
                      onClick={() => OpenModalLevel({ level: found, technique })}
                    >
                      <CardContent sx={{  height:"100%"}}>
                        <Grid container justifyContent={"space-between"} alignItems="center" sx={{  height:"100%"}}>
                            <Grid item xs={12}  sx={{textAlign: "center"}}>
                              <Typography variant="h6" color={"white"}>
                                {technique.name}
                              </Typography>
                            </Grid>
                            <Grid item xs={12} sx={{textAlign: "center"}} >
                              <Typography variant="body2" color="white">
                              {found?.created_at && new Date(found.created_at).toLocaleDateString('es-ES')}
                              </Typography>
                            </Grid>
                            <Grid item xs={12} sx={{textAlign: "center"}}>
                              <Rating value={getPercentage(found?.power)} size="small"  readOnly />
                            </Grid>
                        </Grid>
                      
                      </CardContent>
                    </Card>
                  </Grid>
                  )
                })}
              </Grid>
            </AccordionDetails>
          </StyledAccordion>
        )})}
       <TechniqueModal
        open={modalOpen}
        techniqueName={technique?.name ?? ""}
        categoryName={technique?.categoria ?? ""}
        ratingValue={powerLevel?.power ?? 0}
        power={powerLevel?.power ?? 0}
        setModal={setModalOpen}
        updatePowerLevel={updatePowerLevel}
      />
    </Box>
  );
};

