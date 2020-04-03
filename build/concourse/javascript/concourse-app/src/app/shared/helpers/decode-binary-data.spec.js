"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const decode_binary_data_1 = require("./decode-binary-data");
describe('Decode Binary Data', () => {
    it('should return a valid json object when given a base64 string', () => {
        const sampleFileUpload = 'data:application/json;base64,ewogICJBV1NUZW1wbGF0ZUZvcm1hdFZlcnNpb24iOiAiMjAxMC0wOS0wOSIsCiAgIlJlc291cmNlcyI6IHsKICAgICJ6b25lY29uY291cnNlbGluayI6IHsKICAgICAgIlR5cGUiOiAiQVdTOjpSb3V0ZTUzOjpIb3N0ZWRab25lIiwKICAgICAgIlByb3BlcnRpZXMiOiB7CiAgICAgICAgIk5hbWUiOiAiY29uY291cnNlLmxpbmsuIgogICAgICB9CiAgICB9CiAgfQp9Cg==';
        // TODO: object comparison is sensitive to spaces. Don't change
        const expectedObject = `{
  \"AWSTemplateFormatVersion\": \"2010-09-09\",
  \"Resources\": {
    \"zoneconcourselink\": {
      \"Type\": \"AWS::Route53::HostedZone\",
      \"Properties\": {
        \"Name\": \"concourse.link.\"
      }
    }
  }
}
`;
        expect(decode_binary_data_1.decodeBinaryData(sampleFileUpload)).toBe(expectedObject);
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjb2RlLWJpbmFyeS1kYXRhLnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvc2hhcmVkL2hlbHBlcnMvZGVjb2RlLWJpbmFyeS1kYXRhLnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw2REFBd0Q7QUFFeEQsUUFBUSxDQUFDLG9CQUFvQixFQUFFLEdBQUcsRUFBRTtJQUNsQyxFQUFFLENBQUMsOERBQThELEVBQUUsR0FBRyxFQUFFO1FBQ3RFLE1BQU0sZ0JBQWdCLEdBQUcsdVRBQXVULENBQUM7UUFDalYsK0RBQStEO1FBQy9ELE1BQU0sY0FBYyxHQUFHOzs7Ozs7Ozs7OztDQVcxQixDQUFDO1FBQ0UsTUFBTSxDQUFDLHFDQUFnQixDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7SUFDbEUsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMsQ0FBQyJ9