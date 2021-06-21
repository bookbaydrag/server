import { Request, Response } from 'express';
declare const PersonController: {
    createPerson: (req: Request, res: Response) => Promise<void>;
    getAllPeople: (req: Request, res: Response) => Promise<void>;
    getOnePerson: (req: Request, res: Response) => Promise<void>;
    updatePerson: (req: Request, res: Response) => Promise<void>;
    deletePerson: (req: Request, res: Response) => Promise<void>;
};
export default PersonController;
