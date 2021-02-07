import { Center, Text, Image, theme, Skeleton, Heading, Stack } from '@chakra-ui/react';
import React, { FunctionComponent } from 'react';
import StudentPhoto from '../interfaces/StudentPhoto';
import StudentProfile from '../interfaces/StudentProfile';
import LoadingSection from './LoadingSection';

import titleString from '../utils/titleString';

interface StudentDataSectionProps {
  photo: StudentPhoto | undefined;
  profile: StudentProfile | undefined;
  isLoading: boolean;
}

const StudentDataSection: FunctionComponent<StudentDataSectionProps> = ({ photo, profile, isLoading }) => {
  if (!profile && !isLoading) {
    return (
      <>
        <Heading textAlign="center" fontSize={['md', '4xl']}>
          Login to view your data.
        </Heading>
      </>
    );
  } else if (isLoading) {
    return (
      <>
        <Center w={theme.sizes.full} my={4}>
          <Skeleton startColor="brand.400" endColor="brand.800" borderRadius={theme.radii.lg}>
            <Image borderRadius={theme.radii.lg} boxSize="200px" fit="cover" />
          </Skeleton>
        </Center>
        <Stack>
          {(() => {
            let spookyScarySkeletons = [];
            for (let i = 0; i <= 9; i++) {
              spookyScarySkeletons.push(
                <Skeleton key={i} startColor="brand.400" endColor="brand.800" height="20px"></Skeleton>
              );
            }
            return spookyScarySkeletons;
          })()}
        </Stack>
      </>
    );
  } else if (profile !== undefined && photo !== undefined) {
    return (
      <>
        <Center w={theme.sizes.full} my={4}>
          <Image
            borderRadius={theme.radii.lg}
            boxSize="200px"
            fit="cover"
            src={`data:image/jpg;base64,${photo.base64_photo}`}
            alt={profile.NAME}
          />
        </Center>
        <Stack textAlign="center">
          <Text>
            Name:{' '}
            <Text as="span" d="inline" fontWeight={theme.fontWeights.semibold}>
              {titleString(profile.NAME)}
            </Text>
          </Text>
          <Text>
            Intake:{' '}
            <Text as="span" d="inline" fontWeight={theme.fontWeights.semibold}>
              {profile.INTAKE}
            </Text>
          </Text>
          <Text>
            IC/Passport Number:{' '}
            <Text as="span" d="inline" fontWeight={theme.fontWeights.semibold}>
              {profile.IC_PASSPORT_NO}
            </Text>
          </Text>
          <Text>
            Country:{' '}
            <Text as="span" d="inline" fontWeight={theme.fontWeights.semibold}>
              {profile.COUNTRY}
            </Text>
          </Text>
          <Text>
            Mentor:{' '}
            <Text as="span" d="inline" fontWeight={theme.fontWeights.semibold}>
              {titleString(profile.MENTOR_NAME)}
            </Text>
          </Text>
          <Text>
            Programme Leader:{' '}
            <Text as="span" d="inline" fontWeight={theme.fontWeights.semibold}>
              {titleString(profile.PL_NAME)}
            </Text>
          </Text>
          <Text>
            Programme:{' '}
            <Text as="span" d="inline" fontWeight={theme.fontWeights.semibold}>
              {profile.PROGRAMME}
            </Text>
          </Text>
          <Text>
            Email:{' '}
            <Text as="span" d="inline" fontWeight={theme.fontWeights.semibold}>
              {profile.STUDENT_EMAIL}
            </Text>
          </Text>
          <Text>
            TP Number:{' '}
            <Text as="span" d="inline" fontWeight={theme.fontWeights.semibold}>
              {profile.STUDENT_NUMBER}
            </Text>
          </Text>
        </Stack>
      </>
    );
  } else {
    return <LoadingSection />;
  }
};

export default StudentDataSection;
