import {
  Box,
  Container,
  Text,
  Heading,
  Input,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Stat,
  StatGroup,
  StatLabel,
  StatNumber,
  theme,
  Button,
} from '@chakra-ui/react';
import React, { ChangeEvent, useContext, useEffect, useRef, useState } from 'react';
import StudentData from './data';
import { WoonPageContext, StudentInformation } from './index';

const NavigationGroup = () => {
  const { students, perPage, setPage, page, handleSliderChange } = useContext(WoonPageContext);

  const numberOfStudents = students?.length || 1;

  const paginationLinks = [];
  for (let i = 0; i < Math.ceil(numberOfStudents / perPage); i++) {
    paginationLinks.push(
      <Button
        key={i}
        w={theme.sizes[10]}
        bgColor={page === i + 1 ? 'brand.700' : 'white'}
        color={page === i + 1 ? 'brand.50' : 'unset'}
        h={theme.sizes[10]}
        borderRadius={theme.radii.none}
        onClick={() => {
          handlePageChange(i + 1);
        }}
      >
        {i + 1}
      </Button>
    );
  }

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  return (
    <>
      <Box w="100%" maxW={theme.sizes.xl} marginTop={theme.space[2]} d="flex">
        <Text color="white" mx={4}>
          {perPage}
        </Text>
        <Slider
          focusThumbOnChange={false}
          defaultValue={12}
          min={12}
          max={48}
          onChange={handleSliderChange}
          value={perPage}
        >
          <SliderTrack>
            <SliderFilledTrack bg="brand.700" />
          </SliderTrack>
          <SliderThumb boxSize={6} />
        </Slider>
      </Box>
      <Box my={theme.space[6]}>{paginationLinks}</Box>
    </>
  );
};

const Search = () => {
  const [students, setStudents] = useState<StudentInformation[]>();
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(24);

  const searchRef = useRef<HTMLInputElement>(null);
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const tutorial = searchRef.current?.value.match(/(?<=t:)(\d)/gi)?.[0] || 0;
    const tp = searchRef.current?.value.match(/(?<=tp:)(\d+)/gi)?.[0] || '';

    const x = searchRef.current?.value.replace(/t:\d+/i, '');
    const y = x?.replace(/tp:\d+/i, '');

    const q = y?.trim().toLowerCase();

    const newStudents = StudentData.filter((student) => {
      let t = true,
        id = true,
        nm = true;

      if (tutorial) {
        t = student.tutorial === parseInt(tutorial);
      }
      if (tp) {
        id = student.tp.toLowerCase().includes(`tp${tp}`);
      }
      if (q) {
        nm = student.name.toLowerCase().includes(q);
      }
      return nm && t && id;
    });

    let newPage = Math.ceil(newStudents.length / perPage);

    if (page > newPage) {
      setPage(newPage);
    }

    if (newPage === 0) {
      setPage(1);
    }

    console.log(newPage, page);
    setStudents(newStudents);
  };

  useEffect(() => {
    setStudents(StudentData);
  }, []);

  const handleSliderChange = (value: number) => {
    setPerPage(value);
  };
  return (
    <WoonPageContext.Provider value={{ students, handleSliderChange, page, perPage, setPage }}>
      <Container centerContent maxW={theme.sizes['6xl']}>
        <Heading
          as="h1"
          fontSize={[theme.fontSizes['2xl'], theme.fontSizes['6xl']]}
          color="white"
          marginBottom={theme.space[8]}
          size="3xl"
        >
          Students in UCDF1904ICT(SE)
        </Heading>
        <Input
          ref={searchRef}
          onChange={handleSearch}
          maxW={theme.sizes.xl}
          bgColor="white"
          marginBottom={theme.space[2]}
          placeholder="Name [tp:number] [t:number]"
        />
        <NavigationGroup />
        <StatGroup maxW={theme.sizes.full}>
          {students?.slice((page - 1) * perPage, perPage * page).map((student) => {
            return (
              <Box
                key={student.tp}
                bgColor="white"
                flex="1 1 21%"
                margin={2}
                p={2}
                borderRadius={theme.radii.lg}
                boxShadow={theme.shadows.md}
                px={theme.space[3]}
                maxW={theme.sizes.full}
              >
                <Stat>
                  <StatLabel>{student.tp}</StatLabel>
                  <StatNumber isTruncated>{student.name}</StatNumber>
                  <StatLabel>Tutorial {student.tutorial}</StatLabel>
                </Stat>
              </Box>
            );
          })}
        </StatGroup>
        <NavigationGroup />
      </Container>
    </WoonPageContext.Provider>
  );
};

export default Search;
