export class Resume {
  id!: number;
  title!: string;
  description!: string;
  experience!: string;
  skills!: string[];
  appliedVacancies: number[] = [];
}
