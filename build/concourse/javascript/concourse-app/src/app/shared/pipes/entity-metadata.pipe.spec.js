"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const entity_metadata_pipe_1 = require("./entity-metadata.pipe");
const version_text_pipe_1 = require("./version-text.pipe");
describe('EntityMetadataPipe', () => {
    let pipe;
    let versionPipe;
    beforeEach(() => {
        versionPipe = new version_text_pipe_1.VersionTextPipe();
        pipe = new entity_metadata_pipe_1.EntityMetadataPipe(versionPipe);
    });
    it('create an instance', () => {
        expect(pipe).toBeTruthy();
    });
    it('should return correct version metadata', () => {
        expect(pipe.transform({
            id: 123,
            majorVersion: 1,
            minorVersion: 2,
            isLatest: true,
            status: 'PUBLISHED'
        })).toBe('123 | PUBLISHED | latest | v1.2');
        expect(pipe.transform({
            id: 123,
            majorVersion: 0,
            minorVersion: 8,
            isLatest: false,
            status: 'DRAFT'
        })).toBe('123 | DRAFT | v0.8');
    });
    it('should return -- for version 0.0', () => {
        expect(pipe.transform({
            majorVersion: 0,
            minorVersion: 0,
            isLatest: true,
            status: 'PUBLISHED'
        }, 123)).toBe('123 | PUBLISHED | latest | --');
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW50aXR5LW1ldGFkYXRhLnBpcGUuc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9zaGFyZWQvcGlwZXMvZW50aXR5LW1ldGFkYXRhLnBpcGUuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLGlFQUE0RDtBQUM1RCwyREFBc0Q7QUFFdEQsUUFBUSxDQUFDLG9CQUFvQixFQUFFLEdBQUcsRUFBRTtJQUNsQyxJQUFJLElBQXdCLENBQUM7SUFDN0IsSUFBSSxXQUE0QixDQUFDO0lBRWpDLFVBQVUsQ0FBQyxHQUFHLEVBQUU7UUFDZCxXQUFXLEdBQUcsSUFBSSxtQ0FBZSxFQUFFLENBQUM7UUFDcEMsSUFBSSxHQUFHLElBQUkseUNBQWtCLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDN0MsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsb0JBQW9CLEVBQUUsR0FBRyxFQUFFO1FBQzVCLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUM1QixDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyx3Q0FBd0MsRUFBRSxHQUFHLEVBQUU7UUFDaEQsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQ25CO1lBQ0UsRUFBRSxFQUFFLEdBQUc7WUFDUCxZQUFZLEVBQUUsQ0FBQztZQUNmLFlBQVksRUFBRSxDQUFDO1lBQ2YsUUFBUSxFQUFFLElBQUk7WUFDZCxNQUFNLEVBQUUsV0FBVztTQUNwQixDQUNGLENBQUMsQ0FBQyxJQUFJLENBQUMsaUNBQWlDLENBQUMsQ0FBQztRQUUzQyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FDbkI7WUFDRSxFQUFFLEVBQUUsR0FBRztZQUNQLFlBQVksRUFBRSxDQUFDO1lBQ2YsWUFBWSxFQUFFLENBQUM7WUFDZixRQUFRLEVBQUUsS0FBSztZQUNmLE1BQU0sRUFBRSxPQUFPO1NBQ2hCLENBQ0YsQ0FBQyxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO0lBQ2hDLENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLGtDQUFrQyxFQUFFLEdBQUcsRUFBRTtRQUMxQyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FDbkI7WUFDRSxZQUFZLEVBQUUsQ0FBQztZQUNmLFlBQVksRUFBRSxDQUFDO1lBQ2YsUUFBUSxFQUFFLElBQUk7WUFDZCxNQUFNLEVBQUUsV0FBVztTQUNwQixFQUFFLEdBQUcsQ0FDUCxDQUFDLENBQUMsSUFBSSxDQUFDLCtCQUErQixDQUFDLENBQUM7SUFDM0MsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMsQ0FBQyJ9