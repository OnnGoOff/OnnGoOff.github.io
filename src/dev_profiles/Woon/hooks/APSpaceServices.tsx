import querystring from 'querystring';

/**
 *
 */
const ticketUrl = 'https://cas.apiit.edu.my/cas/v1/tickets';

const getServiceTicket = async (serviceUrl: string, username: string, password: string) => {
  const data = querystring.stringify({ username, password });
  const service = querystring.stringify({
    service: serviceUrl,
  });

  const svcTicketReq = await fetch(ticketUrl, {
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    method: 'POST',
    body: data,
  });

  if (svcTicketReq.status === 201) {
    const svcReqLoc = svcTicketReq.headers.get('Location');
    if (svcReqLoc) {
      const svcData = await fetch(svcReqLoc, {
        headers: { 'content-type': 'application/x-www-form-urlencoded', accept: 'application/json, text/plain, */*' },
        method: 'POST',
        body: service,
      });
      if (svcData) {
        return svcData.text();
      } else {
        return 'Failed to get data';
      }
    }
  } else if (svcTicketReq.status === 200) {
    return svcTicketReq.text();
  }
  throw new Error('Service API cannot be found');
};

const getAPCardData = async (username: string, password: string) => {
  const serviceUrl = 'https://api.apiit.edu.my/apcard/';
  const serviceTicket = await getServiceTicket(serviceUrl, username, password);
  const APCardData = await fetch(`${serviceUrl}?ticket=${serviceTicket}`);
  return APCardData.json();
};

const getStudentProfile = async (username: string, password: string) => {
  const serviceUrl = 'https://api.apiit.edu.my/student/profile';
  const serviceTicket = await getServiceTicket(serviceUrl, username, password);
  const StudentProfile = await fetch(`${serviceUrl}?ticket=${serviceTicket}`);
  return StudentProfile.json();
};

const getStudentImage = async (username: string, password: string) => {
  const serviceUrl = 'https://api.apiit.edu.my/student/photo';
  const serviceTicket = await getServiceTicket(serviceUrl, username, password);
  const StudentProfile = await fetch(`${serviceUrl}?ticket=${serviceTicket}`);
  return StudentProfile.json();
};

export { getAPCardData, getStudentProfile, getStudentImage };

// Service URL
// https://api.apiit.edu.my/apcard/?ticket=ST-2425255-ROrIOn6GOjwg1eboAcM4rIN5ItUip-172-33-0-27
// https://api.apiit.edu.my/student/photo?ticket=ST-2425252-qBcGtA4tkkaRzUsJzA30zIMMaugip-172-33-0-27
// https://api.apiit.edu.my/student/profile?ticket=ST-2425257-j1KkQyw2Vj1P1bV5pZ2haqB72Xoip-172-33-0-27
// https://api.apiit.edu.my/student/courses?ticket=ST-2425264-gKxGO8cVldntYLjcUB50-YT23UUip-172-33-0-27
// https://api.apiit.edu.my/staff/listing?ticket=ST-2425265-0ns-vCtEiGJ7IvJgPlfL7STpsg4ip-172-33-0-27
// https://api.apiit.edu.my/student/sub_and_course_details?intake=UCDF1904ICT(SE)&ticket=ST-2425270-LnejGzKE9u8c8IaU9zH0A0MpCLkip-172-33-0-27
